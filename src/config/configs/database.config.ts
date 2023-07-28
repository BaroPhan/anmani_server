import { BaseEnvironmentConfig } from '../../utils/base/base.config.utils';
import { registerAs } from '@nestjs/config';
import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsString } from 'class-validator';
import { ConfigName } from '../config.constants';

export class DatabaseVariables {
  @Expose()
  @IsString()
  DATABASE_TYPE: string;

  @Expose()
  @IsString()
  DATABASE_HOST: string;

  @Expose()
  @IsInt()
  DATABASE_PORT: number;

  @Expose()
  @IsString()
  DATABASE_USERNAME: string;

  @Expose()
  @IsString()
  @Transform(({ value }) => value || null)
  DATABASE_PASSWORD: string;

  @Expose()
  @IsString()
  DATABASE_NAME: string;

  @Expose()
  @IsBoolean()
  @Transform((value) => {
    return value.obj[value.key] === 'true';
  })
  DATABASE_SYNCHRONIZE: boolean;
}

class DatabaseConfig extends BaseEnvironmentConfig<DatabaseVariables> {
  constructor() {
    super(DatabaseVariables);
  }
}

export default registerAs<DatabaseVariables>(ConfigName.DATABASE, () =>
  new DatabaseConfig().getConfiguration(),
);
