import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { ConfigName } from 'src/config/config.constants';
import { AuthVariables } from 'src/config/configs/auth.config';
import { GlobalResponse } from 'src/interceptors/response.interceptor';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(protected configService: ConfigService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { JWT_TOKEN }: AuthVariables = this.configService.getOrThrow(
      ConfigName.AUTH,
      {
        infer: true,
      },
    );

    let {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
      message = HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR],
    } = exception.response || {};
    const { error = exception.message } = exception.response;
    switch (exception.constructor) {
      case HttpException:
        statusCode = (exception as HttpException).getStatus();
        break;

      // TYPEORM ERRORS
      case QueryFailedError:
        statusCode = HttpStatus.BAD_REQUEST;
        message = (exception as QueryFailedError).message;
        break;
      case EntityNotFoundError:
        statusCode = HttpStatus.NOT_FOUND;
        message = (exception as EntityNotFoundError).message;
        break;

      // JWT ERRORS
      case UnauthorizedException:
        message = (response.req.authInfo as UnauthorizedException).message;
        response.clearCookie(JWT_TOKEN);
        break;

      default:
        break;
    }
    response
      .status(statusCode)
      .json(GlobalResponse({ statusCode, message, error }));
  }
}
