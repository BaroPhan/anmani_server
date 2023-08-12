import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidatedConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { UtilsModule } from './utils/utils.module';
import { DecoratorModule } from './decorators/decorator.module';
import { ProductsModule } from './products/products.module';
import { VouchersModule } from './vouchers/vouchers.module';
import { CartsModule } from './carts/carts.module';
import { VideosModule } from './videos/videos.module';
import { NotificationsModule } from './notifications/notifications.module';
import { LikesModule } from './likes/likes.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/role.guards';
import { JwtAuthGuard } from './guards/jwt.guards';

@Module({
  imports: [
    ValidatedConfigModule,
    DatabaseModule,
    UsersModule,
    RolesModule,
    UtilsModule,
    DecoratorModule,
    ProductsModule,
    VouchersModule,
    CartsModule,
    VideosModule,
    NotificationsModule,
    LikesModule,
    BookmarksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
