import { EnvironmentConfig } from './../utils/config.utils';
import { registerAs } from '@nestjs/config';
import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsString } from 'class-validator';

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
  @Transform(({ value }) => value === 'true')
  DATABASE_SYNCHRONIZE: boolean;
}

class DatabaseConfig extends EnvironmentConfig<DatabaseVariables> {
  constructor() {
    super(DatabaseVariables);
  }
}

const configName = 'database';
export default registerAs<DatabaseVariables>(configName, () =>
  new DatabaseConfig().getConfiguration(),
);
