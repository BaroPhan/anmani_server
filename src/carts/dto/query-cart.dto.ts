import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { QueryDTO } from 'src/utils/helper.utils';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { Cart, createCartDTO } from '../entities/cart.entity';

export class QueryCartDto extends PartialType(
  IntersectionType(QueryDTO, PickType(Cart, createCartDTO)),
) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(createCartDTO)
  sort: string;
}
