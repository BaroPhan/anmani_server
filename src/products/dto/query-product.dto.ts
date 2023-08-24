import {
  ApiPropertyOptional,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { QueryDTO } from 'src/utils/helper.utils';
import { IsIn, IsOptional, IsString } from 'class-validator';
import {
  Product,
  queryProductDTO,
  sortProductDTO,
} from '../entities/product.entity';
import { ApiPropertyEnum } from 'src/decorators/swagger.decorator';

export class QueryProductDto extends PartialType(
  IntersectionType(QueryDTO, PickType(Product, queryProductDTO)),
) {
  @ApiPropertyEnum(sortProductDTO, { required: false })
  @IsOptional()
  @IsString()
  @IsIn(sortProductDTO)
  sort: string;

  @ApiPropertyOptional()
  @IsOptional()
  price: string;

  @ApiPropertyOptional()
  @IsOptional()
  location: string;

  @ApiPropertyOptional()
  @IsOptional()
  investor: string;
}
