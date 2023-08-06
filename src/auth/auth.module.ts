import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigName } from 'src/config/config.constants';
import { AuthVariables } from 'src/config/configs/auth.config';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const { JWT_SECRET, JWT_EXPIRES_IN }: AuthVariables = configService.get(
          ConfigName.AUTH,
          {
            infer: true,
          },
        );
        return {
          secret: JWT_SECRET,
          signOptions: { expiresIn: JWT_EXPIRES_IN },
        };
      },

      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
