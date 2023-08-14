import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function ApiPropertyEmail(): PropertyDecorator {
  return applyDecorators(ApiProperty({ default: 'name@email.com' }));
}

export function ApiPropertyURL(): PropertyDecorator {
  return applyDecorators(ApiProperty({ default: 'http://url.com' }));
}

export function ApiPropertyURLArray(): PropertyDecorator {
  return applyDecorators(
    ApiProperty({ default: ['http://url1.com', 'http://url2.com'] }),
  );
}

export function ApiPropertyEnum(enumObject: object): PropertyDecorator {
  return ApiProperty({ enum: enumObject, default: enumObject[0] });
}
