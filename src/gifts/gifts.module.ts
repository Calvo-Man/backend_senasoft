/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { GiftsController } from './gifts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gift } from './entities/gift.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Gift]),
  ],
  controllers: [GiftsController],
  providers: [GiftsService],
  exports: [GiftsService],
})
export class GiftsModule {}
