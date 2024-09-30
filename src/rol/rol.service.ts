/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
// import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';

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
  

  // update(id: number, updateRolDto: UpdateRolDto) {
  //   return `This action updates a #${id} rol`;
  // }

  remove(id: number) {
    return `This action removes a #${id} rol`;
  }
}
