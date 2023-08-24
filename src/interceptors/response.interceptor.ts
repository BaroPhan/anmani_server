import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { Observable } from 'rxjs';

export interface IResponse {
  statusCode: number;
  message: string;
  data?: Observable<string | unknown>;
  error?: string;
}
export const GlobalResponse = ({
  statusCode,
  message,
  data = undefined,
  error = undefined,
}): IResponse => {
  return {
    statusCode,
    message,
    data,
    error,
  };
};
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map((data) =>
        GlobalResponse({
          statusCode: response.statusCode,
          message: HttpStatus[response.statusCode],
          data,
        }),
      ),
    );
  }
}
