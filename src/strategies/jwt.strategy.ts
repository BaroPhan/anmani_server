import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ConfigName } from 'src/config/config.constants';
import { AuthVariables } from 'src/config/configs/auth.config';

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
