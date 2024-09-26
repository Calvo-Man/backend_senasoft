/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolModule } from 'src/rol/rol.module';
import { Training } from 'src/training/entities/training.entity';
import { TrainingModule } from 'src/training/training.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Training]),
    RolModule,
    
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
