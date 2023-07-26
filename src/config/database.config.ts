import { EnvironmentConfig } from './../utils/config.utils';
import { registerAs } from '@nestjs/config';
import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsString } from 'class-validator';

// type DatabaseConfigType = {
//     url?: string;
//     type?: string;
//     host?: string;
//     port?: number;
//     password?: string;
//     name?: string;
//     username?: string;
//     synchronize?: boolean;
//     maxConnections: number;
//     sslEnabled?: boolean;
//     rejectUnauthorized?: boolean;
//     ca?: string;
//     key?: string;
//     cert?: string;
// };

export class EnvironmentVariablesValidator {
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

class DatabaseConfig extends EnvironmentConfig<EnvironmentVariablesValidator> {
  constructor() {
    super(EnvironmentVariablesValidator);
  }
}
const configName = 'database';
export default registerAs<EnvironmentVariablesValidator>(configName, () =>
  new DatabaseConfig().getConfiguration(),
);
