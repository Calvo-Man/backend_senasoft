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

  findAll() {
    return `This action returns all rol`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rol`;
  }

  // update(id: number, updateRolDto: UpdateRolDto) {
  //   return `This action updates a #${id} rol`;
  // }

  remove(id: number) {
    return `This action removes a #${id} rol`;
  }
}
