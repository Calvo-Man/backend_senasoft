/* eslint-disable prettier/prettier */
import { JwtService } from '@nestjs/jwt';

import * as bcryptjs from 'bcryptjs';
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterAuthDto } from './dto/register.dto';
import { LoginAuthDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerAuthDto: RegisterAuthDto) {
    const user = await this.usersService.findByEmail(registerAuthDto.email);

    if (user) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPassword = await bcryptjs.hash(registerAuthDto.password, 10);

    return await this.usersService.create({
      ...registerAuthDto,
      password: hashedPassword,
    });
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.usersService.findByEmail(loginAuthDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcryptjs.compare(loginAuthDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { email: user.email, role: user.rol.rol_name, id: user.id };

    const token = await this.jwtService.signAsync(payload);

    if (!token) {
      throw new UnauthorizedException('You have not validate credentials')
    }
    return {
      token,
      user:user.rol.rol_name

    };
  }
}
