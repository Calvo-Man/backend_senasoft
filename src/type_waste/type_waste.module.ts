import { Module } from '@nestjs/common';
import { TypeWasteService } from './type_waste.service';
import { TypeWasteController } from './type_waste.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeWaste } from './entities/type_waste.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeWaste]),
  ],
  controllers: [TypeWasteController],
  providers: [TypeWasteService],
  exports: [TypeWasteService],
})
export class TypeWasteModule {}
