import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidatedConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { UtilsModule } from './utils/utils.module';
import { ValidationModule } from './validation/validation.module';

@Module({
  imports: [
    ValidatedConfigModule,
    DatabaseModule,
    UsersModule,
    RolesModule,
    UtilsModule,
    ValidationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
