import { Injectable } from '@nestjs/common';
import { CreateTypeWasteDto } from './dto/create-type_waste.dto';
import { UpdateTypeWasteDto } from './dto/update-type_waste.dto';
import { TypeWaste } from './entities/type_waste.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeWasteService {
  constructor(
    @InjectRepository(TypeWaste)
    private readonly typeWasteRepository: Repository<TypeWaste>,
  ) {}
  async create(createTypeWasteDto: CreateTypeWasteDto) {
    const typeWaste = this.typeWasteRepository.create(createTypeWasteDto);
    return await this.typeWasteRepository.save(typeWaste);
  }

  findAll() {
    return `This action returns all typeWaste`;
  }

  async findOne(id: number) {
    return await this.typeWasteRepository.findOneBy({ id });
  }

  update(id: number, updateTypeWasteDto: UpdateTypeWasteDto) {
    return `This action updates a #${id} typeWaste`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeWaste`;
  }
}
