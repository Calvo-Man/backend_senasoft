import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeWasteService } from './type_waste.service';
import { CreateTypeWasteDto } from './dto/create-type_waste.dto';
import { UpdateTypeWasteDto } from './dto/update-type_waste.dto';

@Controller('type-waste')
export class TypeWasteController {
  constructor(private readonly typeWasteService: TypeWasteService) {}

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeWasteDto: UpdateTypeWasteDto) {
    return this.typeWasteService.update(+id, updateTypeWasteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeWasteService.remove(+id);
  }
}
