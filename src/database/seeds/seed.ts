import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { RolesSeedService } from './roles/roles.seed.service';

const seed = async () => {
  const app = await NestFactory.create(SeedModule);
  await app.get(RolesSeedService).seed();
  await app.close();
};

seed();
