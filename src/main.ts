import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { ConfigName } from './config/config.constants';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const { APP_PORT, API_PREFIX } = app
    .get(ConfigService)
    .getOrThrow(ConfigName.APP, { infer: true });
  app.setGlobalPrefix(API_PREFIX, { exclude: ['/'] });
  app.enableVersioning({ type: VersioningType.URI });
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  app.use(cookieParser('sercet'));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableShutdownHooks();
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion(VersioningType.URI.toString())
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(APP_PORT);
}
bootstrap();
