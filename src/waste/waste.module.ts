/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WasteService } from './waste.service';
import { WasteController } from './waste.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Waste } from './entities/waste.entity';
import { UsersModule } from 'src/users/users.module';
import { TypeWasteModule } from 'src/type_waste/type_waste.module';

import { CompanyModule } from 'src/company/company.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([Waste]),
    UsersModule,
    TypeWasteModule,
    CompanyModule,
    MailerModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('HOST_EMAIL'),
          port: 587,
          secure: false,
          auth: {
            user: configService.get<string>('EMAIL_REMITENTE'),
            pass: configService.get<string>('PASSWORD_EMAIL_REMITENTE'),
          },
          
        },
        defaults: {
          from: `'CleanWorld' ${configService.get<string>('EMAIL_REMITENTE')}`,
        },
        template: {
          dir:  './templates/',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },     
      }),inject:[ConfigService]
    })
  ],
  controllers: [WasteController],
  providers: [WasteService, ConfigService],
  exports: [WasteService],
})
export class WasteModule {}
