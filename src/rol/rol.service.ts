/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';

import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
      
  ) {}
  async create(createRolDto: CreateRolDto) {
    return await this.rolRepository.save(createRolDto);
  }

  async findAll() {
    return await this.rolRepository.find();
  }

  async findOne(id: number) {
    return await this.rolRepository.findOneBy({ id });
  }

  async findOneByName() {
    return await this.rolRepository.findOneBy({ rol_name: 'user' });
  }
  

 async update(id: number, updateRolDto: UpdateRolDto) {
    return await this.rolRepository.update(id, updateRolDto);
   }

  remove(id: number) {
    return `This action removes a #${id} rol`;
  }
}
