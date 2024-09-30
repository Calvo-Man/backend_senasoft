/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CollectionPointService } from './collection_point.service';
import { CreateCollectionPointDto } from './dto/create-collection_point.dto';
import { UpdateCollectionPointDto } from './dto/update-collection_point.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/rol/guard/rol/rol.guard';
import { Roles } from 'src/rol/decorators/role.decorator';

@Controller('collection-point')

export class CollectionPointController {
  constructor(private readonly collectionPointService: CollectionPointService) {}

  @Post()
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('admin', 'company')
  create(@Body() createCollectionPointDto: CreateCollectionPointDto) {
    return this.collectionPointService.create(createCollectionPointDto);
  }

  @Get()
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('admin', 'company','user')
  findAll() {
    return this.collectionPointService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('admin', 'company','user')
  findOne(@Param('id') id: string) {
    return this.collectionPointService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('admin', 'company')
  update(@Param('id') id: string, @Body() updateCollectionPointDto: UpdateCollectionPointDto) {
    return this.collectionPointService.update(+id, updateCollectionPointDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('admin', 'company')
  remove(@Param('id') id: string) {
    return this.collectionPointService.remove(+id);
  }
}
