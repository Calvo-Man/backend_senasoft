/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, } from '@nestjs/common';
import { CreateWasteDto } from './dto/create-waste.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Waste } from './entities/waste.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { TypeWasteService } from 'src/type_waste/type_waste.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class WasteService {
  constructor(
    @InjectRepository(Waste)
    private readonly wasteRepository: Repository<Waste>,
    private readonly usersService: UsersService,
    private readonly typeWasteService: TypeWasteService,
    private readonly companyService: CompanyService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  async create(createWasteDto: CreateWasteDto) {
    // Busca el usuario por email
    const users = await this.usersService.findByEmail(createWasteDto.email);
    if (!users) {
      throw new NotFoundException('User not found');
    }
    
    // Busca el tipo de residuo
    const typeWaste = await this.typeWasteService.findOne(
      createWasteDto.typeWasteId,
    );
    if (!typeWaste) {
      throw new NotFoundException('typeWaste not found');
    }
    const company = await this.companyService.findOne(createWasteDto.companyId);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    const redemptionCode = this.generateRedemptionCode();
    // Crea la entidad Waste
    const waste = this.wasteRepository.create({
      ...createWasteDto,
      typeWaste,
      users,
      redemptionCode,
    });
    // Guarda la entidad Waste
    const savedWaste = await this.wasteRepository.save(waste);
    
    // Envia el correo electronico
    return await this.mailerService.sendMail({
      to: savedWaste.users.email,
      subject: "Codigo de redencion de puntos",
      template: 'confirm',
      context: {
        nombres: `${savedWaste.users.name} ${savedWaste.users.last_name}`,
        puntos: savedWaste.typeWaste.points_value,
        code: `${savedWaste.redemptionCode}`
        
      },
      
    }).then((send) => {
      return send.accepted.length > 0 ? {
        success: true,
        message: "Se ha enviado un correo electrónico con el código de redención",
      } : {
        success: false,
        message: "No se ha podido enviar el correo electrónico",
      };
    }).catch(error => {
      return {
        success: false,
        message: "Sucedió un error enviando el correo",
        ex: error
      }
    })

    // Retorna el nuevo Waste, limitando la información del usuario a solo el email
    // return {
    //   id: savedWaste.id,
    //   typeWaste: {
    //     id: savedWaste.typeWaste.id,
    //     name: savedWaste.typeWaste.name,
    //     points_value: savedWaste.typeWaste.points_value,
    //   },
    //   users: {
    //     email: savedWaste.users.email, // Solo devuelve el email del usuario
    //   },
    //   quantity: savedWaste.quantity,
    //   companyId: company.name,
    //   redemptionCode: savedWaste.redemptionCode,
    // };
  }

  async reedemCode(redemptionCode: string): Promise<string> {
    const waste = await this.wasteRepository.findOne({
      where: { redemptionCode: redemptionCode },
      relations: ['typeWaste', 'users'],
    });
    console.log('Redemption Code recibido:', redemptionCode);
    console.log('Resultado de la consulta:', waste);

    console.log(waste);
    if (!waste) {
      throw new NotFoundException('Code not found');
    }
    // Actualiza los puntos del usuario basado en el valor del tipo de residuo
    await this.usersService.updatePoints(
      waste.users.id,
      waste.typeWaste.points_value,
    );
    return 'Redeemed successfully';
  }
  private generateRedemptionCode(): string {
    return Math.random().toString(36).substring(2, 9).toUpperCase(); // Generar un código alfanumérico único de 9 caracteres
  }

  findAll() {
    return `This action returns all waste`;
  }

  findOne(id: number) {
    return `This action returns a #${id} waste`;
  }

  remove(id: number) {
    return `This action removes a #${id} waste`;
  }
}
