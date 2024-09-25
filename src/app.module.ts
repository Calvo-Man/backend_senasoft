/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './rol/rol.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { CollectionPointModule } from './collection_point/collection_point.module';
import { TrainingModule } from './training/training.module';
import { WasteModule } from './waste/waste.module';
import { GiftsModule } from './gifts/gifts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'bd_cleanworld',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    RolModule,
    UsersModule,
    AuthModule,
    CompanyModule,
    CollectionPointModule,
    TrainingModule,
    WasteModule,
    GiftsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
