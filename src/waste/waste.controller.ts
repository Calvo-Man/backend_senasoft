/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WasteService } from './waste.service';
import { CreateWasteDto } from './dto/create-waste.dto';
import { UpdateWasteDto } from './dto/update-waste.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/rol/guard/rol/rol.guard';
import { Roles } from 'src/rol/decorators/role.decorator';

@Controller('waste')
@UseGuards(AuthGuard, RolesGuard)
export class WasteController {
  constructor(private readonly wasteService: WasteService) {}

  @Post()
  @Roles('company', 'admin')
  create(@Body() createWasteDto: CreateWasteDto, email: string) {
    return this.wasteService.create(createWasteDto, email);
  }

  @Get()
  @Roles('user', 'admin')
  findAll() {
    return this.wasteService.findAll();
  }

  @Get(':id')
  @Roles('user', 'admin')
  findOne(@Param('id') id: string) {
    return this.wasteService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateWasteDto: UpdateWasteDto) {
    return this.wasteService.update(+id, updateWasteDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.wasteService.remove(+id);
  }
}
