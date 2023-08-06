import { BaseEnvironmentConfig } from '../../utils/base/base.config.utils';
import { registerAs } from '@nestjs/config';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ConfigName } from '../config.constants';

export class AuthVariables {
  @Expose()
  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  JWT_EXPIRES_IN: string;
}

class AuthConfig extends BaseEnvironmentConfig<AuthVariables> {
  constructor() {
    super(AuthVariables);
  }
}

export default registerAs<AuthVariables>(ConfigName.AUTH, () =>
  new AuthConfig().getConfiguration(),
);
