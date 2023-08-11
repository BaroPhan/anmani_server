import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { QueryDTO } from 'src/utils/helper.utils';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { Product, createProductDTO } from '../entities/product.entity';

export class QueryProductDto extends PartialType(
  IntersectionType(QueryDTO, PickType(Product, createProductDTO)),
) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(createProductDTO)
  sort: string;
}
