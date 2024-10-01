/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './entities/training.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Training
    ]),
  ],
  controllers: [TrainingController],
  providers: [TrainingService],
  exports: [TrainingService],
})
export class TrainingModule {}
