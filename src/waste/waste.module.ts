/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WasteService } from './waste.service';
import { WasteController } from './waste.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Waste } from './entities/waste.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Waste]),
  ],
  controllers: [WasteController],
  providers: [WasteService],
  exports: [WasteService],
})
export class WasteModule {}
