/* eslint-disable prettier/prettier */
import {  Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { Rol } from 'src/rol/entities/rol.entity';
import { RolService } from 'src/rol/rol.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository (User) private userRepository:Repository<User>,
    private rolService:RolService

  ){}
  async create(createUserDto: CreateUserDto) {
    const rol = await this.rolService.findOneByName();
    if (!rol) {
      throw new NotFoundException('Rol no encontrado');
    }
    // Asignar el rol al usuario
    const user = this.userRepository.create({
      ...createUserDto,
      rol: rol,   // Usar el rol por defecto o el que se envió
    });
  
    // Guardar el usuario
    return await this.userRepository.save(user);
  }
  
  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
  

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
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
