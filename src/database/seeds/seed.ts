import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { RolesSeedService } from './roles/roles.seed.service';
import { UsersSeedService } from './users/users.seed.service';
import { ReportsSeedService } from './reports/reports.seed.service';

const seed = async () => {
  const app = await NestFactory.create(SeedModule);
  await app.get(RolesSeedService).seed();
  await app.get(UsersSeedService).seed();
  await app.get(ReportsSeedService).seed();
  await app.close();
};

seed();
