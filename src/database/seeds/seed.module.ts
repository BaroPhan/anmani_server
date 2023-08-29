import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { RolesSeedModule } from './roles/roles.seed.module';
import { ValidatedConfigModule } from 'src/config/config.module';
import { UsersSeedModule } from './users/users.seed.module';
import { ReportsSeedModule } from './reports/reports.seed.module';

@Module({
  imports: [
    RolesSeedModule,
    UsersSeedModule,
    ValidatedConfigModule,
    DatabaseModule,
    ReportsSeedModule,
  ],
})
export class SeedModule {}
