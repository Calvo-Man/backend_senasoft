import {  Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateWasteDto } from './dto/create-waste.dto';
import { UpdateWasteDto } from './dto/update-waste.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Waste } from './entities/waste.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { TypeWasteService } from 'src/type_waste/type_waste.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Injectable()
@UseGuards(AuthGuard)
export class WasteService {
  constructor(
    @InjectRepository(Waste)
    private readonly wasteRepository: Repository<Waste>,
    private readonly usersService: UsersService,
    private readonly typeWasteService: TypeWasteService
  ) {}
  
  async create(createWasteDto: CreateWasteDto) {
    const typeWaste =await this.typeWasteService.findOne(createWasteDto.typeWasteId);

    if(!typeWaste){
      throw new NotFoundException('typeWaste not found');
    }
    const users =await this.usersService.findOne(createWasteDto.usersId);

    if(!users){
      throw new NotFoundException('User not found');
    }

    const waste = this.wasteRepository.create({
      ...createWasteDto,
      typeWaste,
      users
    });

    const savedWaste = await this.wasteRepository.save(waste);

    const updatePointsUsers = await this.usersService.updatePoints(users.id, typeWaste.points_value);

  // Devuelve solo el `email` del usuario en la respuesta
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

  }
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
