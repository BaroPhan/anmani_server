import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { RolesSeedModule } from './roles/roles.seed.module';
import { ValidatedConfigModule } from 'src/config/config.module';

@Module({
  imports: [RolesSeedModule, ValidatedConfigModule, DatabaseModule],
})
export class SeedModule {}
