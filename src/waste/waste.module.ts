/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WasteService } from './waste.service';
import { WasteController } from './waste.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Waste } from './entities/waste.entity';
import { UsersModule } from 'src/users/users.module';
import { TypeWasteModule } from 'src/type_waste/type_waste.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Waste]),
    UsersModule,
    TypeWasteModule
  ],
  controllers: [WasteController],
  providers: [WasteService],
  exports: [WasteService],
})
export class WasteModule {}
