import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidatedConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { UtilsModule } from './utils/utils.module';
import { ValidationModule } from './validation/validation.module';
import { ProductsModule } from './products/products.module';
import { VouchersModule } from './vouchers/vouchers.module';
import { CartsModule } from './carts/carts.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    ValidatedConfigModule,
    DatabaseModule,
    UsersModule,
    RolesModule,
    UtilsModule,
    ValidationModule,
    ProductsModule,
    VouchersModule,
    CartsModule,
    VideosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
