/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WasteService } from './waste.service';
import { CreateWasteDto } from './dto/create-waste.dto';

import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/rol/guard/rol/rol.guard';
import { Roles } from 'src/rol/decorators/role.decorator';

@Controller('waste')
export class WasteController {
  constructor(private readonly wasteService: WasteService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('company', 'admin')
  create(@Body() createWasteDto: CreateWasteDto) {
    return this.wasteService.create(createWasteDto);
  }

  @Post('/redeem')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user', 'admin')
  reedemCode(@Body() redemptionCode: string) {
    return this.wasteService.reedemCode(redemptionCode);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user', 'admin')
  findAll() {
    return this.wasteService.findAll();
  }

  @Get(':id')
  @Roles('user', 'admin')
  findOne(@Param('id') id: string) {
    return this.wasteService.findOne(+id);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.wasteService.remove(+id);
  }
}
