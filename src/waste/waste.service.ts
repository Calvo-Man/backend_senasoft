/* eslint-disable prettier/prettier */
import {  Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateWasteDto } from './dto/create-waste.dto';
import { UpdateWasteDto } from './dto/update-waste.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Waste } from './entities/waste.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { TypeWasteService } from 'src/type_waste/type_waste.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CompanyService } from 'src/company/company.service';

@Injectable()
@UseGuards(AuthGuard)
export class WasteService {
  constructor(
    @InjectRepository(Waste)
    private readonly wasteRepository: Repository<Waste>,
    private readonly usersService: UsersService,
    private readonly typeWasteService: TypeWasteService,
    private readonly companyService: CompanyService
  ) {}
  
  async create(createWasteDto: CreateWasteDto,email:string) {
    // Busca el usuario por email
    const users = await this.usersService.findByEmail(email);
    if (!users) {
      throw new NotFoundException('User not found');
    }
    // Busca el tipo de residuo
    const typeWaste = await this.typeWasteService.findOne(createWasteDto.typeWasteId);
    if (!typeWaste) {
      throw new NotFoundException('typeWaste not found');
    }
    const company = await this.companyService.findOne(createWasteDto.companyId);
    if (!company) {  
      throw new NotFoundException('Company not found');
    }   
    
    // Crea la entidad Waste
    const waste = this.wasteRepository.create({
      ...createWasteDto,
      typeWaste,
      users,
      
    });
  
    // Guarda la entidad Waste
    const savedWaste = await this.wasteRepository.save(waste);
  
    // Actualiza los puntos del usuario basado en el valor del tipo de residuo
    await this.usersService.updatePoints(users.id, typeWaste.points_value);
  
    // Retorna el nuevo Waste, limitando la información del usuario a solo el email
    return {
      id: savedWaste.id,
      typeWaste: {
        id: savedWaste.typeWaste.id,
        name: savedWaste.typeWaste.name,
        points_value: savedWaste.typeWaste.points_value,
      },
      users: {
        email: savedWaste.users.email, // Solo devuelve el email del usuario
      },
      quantity: savedWaste.quantity,
      companyId: company.name
    };
  }
  

  findAll() {
    return `This action returns all waste`;
  }

  findOne(id: number) {
    return `This action returns a #${id} waste`;
  }

  update(id: number, updateWasteDto: UpdateWasteDto) {
    return `This action updates a #${id} waste`;
  }

  remove(id: number) {
    return `This action removes a #${id} waste`;
  }
}
