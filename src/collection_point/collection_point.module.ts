/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CollectionPointService } from './collection_point.service';
import { CollectionPointController } from './collection_point.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionPoint } from './entities/collection_point.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        CollectionPoint
    ])
  ],
  controllers: [CollectionPointController],
  providers: [CollectionPointService],
  exports: [CollectionPointService],
})
export class CollectionPointModule {}
