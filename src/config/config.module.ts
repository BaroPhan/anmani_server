import { ConfigModule } from '@nestjs/config';
import databaseConfig from './configs/database.config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: ['.env'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class ValidatedConfigModule {}
