/* eslint-disable prettier/prettier */
import { Module, OnModuleInit } from '@nestjs/common';
import { RoleSeedService } from './rol-seed.service';
import { Rol } from './entities/rol.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rol])],
  providers: [RoleSeedService],
  exports: [RoleSeedService],
})
export class RoleSeedModule implements OnModuleInit {
  constructor(private readonly roleSeedService: RoleSeedService) {}

  async onModuleInit() {
    await this.roleSeedService.createRoles();  // Crear roles en la base de datos
  }
}
