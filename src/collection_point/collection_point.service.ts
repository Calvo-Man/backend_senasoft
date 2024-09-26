import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionPointDto } from './dto/create-collection_point.dto';
import { UpdateCollectionPointDto } from './dto/update-collection_point.dto';
import { Repository } from 'typeorm';
import { CollectionPoint } from './entities/collection_point.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class CollectionPointService {
  constructor(
    @InjectRepository(CollectionPoint)
    private readonly collectionPointRepository: Repository<CollectionPoint>,
    private readonly companyService: CompanyService,

  ) {}
  async create(createCollectionPointDto: CreateCollectionPointDto) {
    // Encuentra la empresa relacionada
    const company = await this.companyService.findOne(createCollectionPointDto.companyId);
    
    if (!company) {
      throw new NotFoundException('Company not found');
    }
  
    // Crea el punto de recolección asociando la empresa
    const collectionPoint = this.collectionPointRepository.create({
      ...createCollectionPointDto,  // Incluimos los datos del DTO
      company: company,                    // Asociamos la empresa al punto de recolección
    });
  
    // Guarda el punto de recolección en la base de datos
    await this.collectionPointRepository.save(collectionPoint);
  
    return collectionPoint;
  }
  

  async findAll() {
    return await this.collectionPointRepository.find({
      relations: ['company'],
    });
  }

  async findOne(id: number) {
    // Encuentra el punto de recolección y carga la relación con la empresa
    const collectionPoint = await this.collectionPointRepository.findOne({
      where: { id },          // Filtra por el ID
      relations: ['company'],  // Carga la relación con la entidad `company`
    });
  
    if (!collectionPoint) {
      throw new Error('Collection point not found');
    }
  
    return collectionPoint;
  }
  

  update(id: number, updateCollectionPointDto: UpdateCollectionPointDto) {
    return `This action updates a #${id} collectionPoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} collectionPoint`;
  }
}
