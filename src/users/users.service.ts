/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {  Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';


import { RolService } from 'src/rol/rol.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private rolService: RolService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // Usar el rol por defecto o el que se envió
    if (!createUserDto.rolId) {

      const rol = await this.rolService.findOneByName();
      const user = this.userRepository.create({
        ...createUserDto,
        rol,
        // Usar el rol por defecto o el que se envió
      });
      return await this.userRepository.save(user);

    } else {

      const rol = await this.rolService.findOne(createUserDto.rolId);
      // Asignar el rol al usuario
      const user = this.userRepository.create({
        ...createUserDto,
        rol,
      });

      // Guardar el usuario
      return await this.userRepository.save(user);
    }

  }

  async findAll() {
    return await this.userRepository.find({
      relations: ['rol'],
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['rol'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user= await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.rolId) {
      const rol = await this.rolService.findOne(updateUserDto.rolId);
      user.rol = rol;
    }

    return await this.userRepository.save(user);
    
  }

  async updatePoints(id: number, points: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.points += points;
    return await this.userRepository.save(user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
