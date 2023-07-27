import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigName } from 'src/config/config.constants';
import { DatabaseVariables } from 'src/config/configs/database.config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const {
      DATABASE_TYPE,
      DATABASE_HOST,
      DATABASE_PORT,
      DATABASE_USERNAME,
      DATABASE_PASSWORD,
      DATABASE_NAME,
      DATABASE_SYNCHRONIZE,
    }: DatabaseVariables = this.configService.getOrThrow(ConfigName.DATABASE, {
      infer: true,
    });

    return {
      type: DATABASE_TYPE,
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      synchronize: DATABASE_SYNCHRONIZE,
      keepConnectionAlive: true,
      autoLoadEntities: true,
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
    } as TypeOrmModuleOptions;
  }
}
