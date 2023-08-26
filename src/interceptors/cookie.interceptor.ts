import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthVariables } from 'src/config/configs/auth.config';
import { ConfigName } from 'src/config/config.constants';

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  constructor(protected configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const response = context.switchToHttp().getResponse<Response>();
    const { JWT_TOKEN }: AuthVariables = this.configService.getOrThrow(
      ConfigName.AUTH,
      {
        infer: true,
      },
    );
    return next.handle().pipe(
      map((data) => {
        response.statusCode = HttpStatus.OK;
        response.cookie(JWT_TOKEN, data.access_token, {
          signed: true,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        });
        return data;
      }),
    );
  }
}
