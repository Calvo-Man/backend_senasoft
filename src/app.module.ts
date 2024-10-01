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
import { TypeWasteModule } from './type_waste/type_waste.module';
import { RoleSeedModule } from './rol/rol-seed.module';
import { ConfigModule } from '@nestjs/config';

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
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno sean accesibles globalmente
    }),
    RolModule,
    UsersModule,
    AuthModule,
    CompanyModule,
    CollectionPointModule,
    TrainingModule,
    WasteModule,
    GiftsModule,
    TypeWasteModule,
    RoleSeedModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
