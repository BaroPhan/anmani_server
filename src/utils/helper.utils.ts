import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class Helper {
  static readonly regex: {
    functionName: RegExp;
    phoneNumber: RegExp;
  } = {
    functionName: /^function\s*([^\s(]+)/,
    phoneNumber: /^(?:(?:\+?84|0)(?: ?|-?)(?:\d(?: ?|-?)?){9})$/,
  };

  capitalizeFirstLetter(text: string) {
    return text.length === 0
      ? text
      : text.charAt(0).toUpperCase() + text.slice(1);
  }

  toArr<T>(value: unknown): Array<T> {
    return Array.isArray(value) ? value : [value];
  }
}

enum ORDER {
  ASC = 'asc',
  DESC = 'desc',
}
export class QueryDTO {
  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => parseInt(value) || null)
  @IsNumber()
  page: number = 1;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => parseInt(value) || null)
  @IsNumber()
  limit: number = 10;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ORDER)
  order: ORDER;
}
