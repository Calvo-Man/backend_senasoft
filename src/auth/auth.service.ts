/* eslint-disable prettier/prettier */
import { JwtService } from '@nestjs/jwt';

import * as bcryptjs from 'bcryptjs';
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {  RegisterAuthDto } from './dto/register.dto';


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    ) {}
  async register(registerAuthDto: RegisterAuthDto) {


    const user = await this.usersService.findByEmail(registerAuthDto.email);

    if (user) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPassword = await bcryptjs.hash(registerAuthDto.password, 10);

    await this.usersService.create({
     ...registerAuthDto,
      password: hashedPassword,
    })

    

    
}}
