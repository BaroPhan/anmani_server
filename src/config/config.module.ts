import { ConfigModule } from '@nestjs/config';
import databaseConfig from './configs/database.config';
import { Module } from '@nestjs/common';
import appConfig from './configs/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class ValidatedConfigModule {}
