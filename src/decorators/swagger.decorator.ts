import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

export function ApiPropertyEmail(value = 'admin@email.com'): PropertyDecorator {
  return applyDecorators(ApiProperty({ default: value }));
}

export function ApiPropertyURL(value = 'http://url.com'): PropertyDecorator {
  return applyDecorators(ApiProperty({ default: value }));
}

export function ApiPropertyURLArray(
  value = ['http://url1.com', 'http://url2.com'],
): PropertyDecorator {
  return applyDecorators(ApiProperty({ default: value }));
}

export function ApiPropertyEnum(
  enumObject: object,
  args?: ApiPropertyOptions,
): PropertyDecorator {
  return ApiProperty({ enum: enumObject, default: enumObject[0], ...args });
}
