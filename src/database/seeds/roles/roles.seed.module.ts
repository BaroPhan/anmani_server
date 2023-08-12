import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { RolesSeedService } from './roles.seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesSeedService],
  exports: [RolesSeedService],
})
export class RolesSeedModule {}
