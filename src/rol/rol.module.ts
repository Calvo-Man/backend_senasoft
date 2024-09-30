/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants/jwt.constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Rol
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [RolController],
  providers: [RolService],
  exports: [RolService],
})
export class RolModule {}
