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
    const rol = await this.rolService.findOne(1);
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
