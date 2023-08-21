import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

export function ApiPropertyEmail(): PropertyDecorator {
  return applyDecorators(ApiProperty({ default: 'admin@email.com' }));
}

export function ApiPropertyURL(): PropertyDecorator {
  return applyDecorators(ApiProperty({ default: 'http://url.com' }));
}

export function ApiPropertyURLArray(): PropertyDecorator {
  return applyDecorators(
    ApiProperty({ default: ['http://url1.com', 'http://url2.com'] }),
  );
}

export function ApiPropertyEnum(
  enumObject: object,
  args?: ApiPropertyOptions,
): PropertyDecorator {
  return ApiProperty({ enum: enumObject, default: enumObject[0], ...args });
}
