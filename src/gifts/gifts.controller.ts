/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/rol/guard/rol/rol.guard';
import { Roles } from 'src/rol/decorators/role.decorator';

@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'company')
  @Post()
  create(@Body() createGiftDto: CreateGiftDto) {
    return this.giftsService.create(createGiftDto);
  }

  @Get()
  findAll() {
    return this.giftsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.giftsService.findOne(+id);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'company')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGiftDto: UpdateGiftDto) {
    return this.giftsService.update(+id, updateGiftDto);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'company')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.giftsService.remove(+id);
  }
}
