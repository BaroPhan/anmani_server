import { ConfigModule } from '@nestjs/config';
import databaseConfig from './configs/database.config';
import { Module } from '@nestjs/common';
import appConfig from './configs/app.config';
import authConfig from './configs/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, authConfig],
      envFilePath: ['.env'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class ValidatedConfigModule {}
