import { BaseEnvironmentConfig } from '../../utils/base/base.config.utils';
import { registerAs } from '@nestjs/config';
import { Expose } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ConfigName } from '../config.constants';

enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export class AppVariables {
  @Expose()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @Expose()
  @IsInt()
  APP_PORT: number;

  @Expose()
  @IsString()
  @IsOptional()
  API_PREFIX: string;
}

class AppConfig extends BaseEnvironmentConfig<AppVariables> {
  constructor() {
    super(AppVariables);
  }
}

export default registerAs<AppVariables>(ConfigName.APP, () =>
  new AppConfig().getConfiguration(),
);
