/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TypeWasteService } from './type_waste.service';
import { CreateTypeWasteDto } from './dto/create-type_waste.dto';
import { UpdateTypeWasteDto } from './dto/update-type_waste.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/rol/guard/rol/rol.guard';
import { Roles } from 'src/rol/decorators/role.decorator';

@Controller('type-waste')
export class TypeWasteController {
  constructor(private readonly typeWasteService: TypeWasteService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() createTypeWasteDto: CreateTypeWasteDto) {
    return this.typeWasteService.create(createTypeWasteDto);
  }
  @Get()
  findAll() {
    return this.typeWasteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeWasteService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeWasteDto: UpdateTypeWasteDto) {
    return this.typeWasteService.update(+id, updateTypeWasteDto);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeWasteService.remove(+id);
  }
}
