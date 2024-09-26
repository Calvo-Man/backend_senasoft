import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gift } from './entities/gift.entity';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class GiftsService {
  constructor(
    @InjectRepository(Gift) private readonly giftRepository: Repository<Gift>,
    private readonly companyService: CompanyService

  ) {}
  async create(createGiftDto: CreateGiftDto) {

    const company = await this.companyService.findOne(createGiftDto.companyId);
    if (!company) {
      throw new NotFoundException('Company not found');
    } 

    const gift = this.giftRepository.create({
      ...createGiftDto,
      company
    });
    return this.giftRepository.save(gift);
  }

  async findAll() {
    return await this.giftRepository.find({
      relations: ['company'],
    });
  }

  async findOne(id: number) {
    const gift = await this.giftRepository.findOne({
      where: { id },
      relations: ['company'],
    });
    if (!gift) {
      throw new NotFoundException('Gift not found');
    }
    return gift;
  }

  update(id: number, updateGiftDto: UpdateGiftDto) {
    return `This action updates a #${id} gift`;
  }

  remove(id: number) {
    return `This action removes a #${id} gift`;
  }
}
