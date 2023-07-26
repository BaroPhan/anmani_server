import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const test = configService.getOrThrow('database');
  console.log(test.DATABASE_TYPE);
  await app.listen(3000);
}
bootstrap();
