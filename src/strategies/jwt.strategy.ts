import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ConfigName } from 'src/config/config.constants';
import { AuthVariables } from 'src/config/configs/auth.config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/decorators/isPublic.decorator';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(protected configService: ConfigService) {
    const { JWT_SECRET }: AuthVariables = configService.getOrThrow(
      ConfigName.AUTH,
      {
        infer: true,
      },
    );
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.signedCookies?.token || null,
      ]),
      secretOrKey: JWT_SECRET,
    });
  }

  public validate(payload: any) {
    if (!payload.sub) throw new UnauthorizedException();
    return payload;
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    return super.canActivate(context);
  }
}
