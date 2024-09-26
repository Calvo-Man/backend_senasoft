import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {

    const company = this.companyRepository.create(createCompanyDto);  

    return await this.companyRepository.save(company);
    
  }

  async findAll() {
    return await this.companyRepository.find(
      {relations: ['collectionPoint']},
    );
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOneBy({ id });
    if (!company) {
      throw new NotFoundException(`Company #${id} not found`);
    }
    return company;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
