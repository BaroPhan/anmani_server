import {
  ApiPropertyOptional,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { QueryDTO } from 'src/utils/helper.utils';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { Product, queryProductDTO } from '../entities/product.entity';
import { ApiPropertyEnum } from 'src/decorators/swagger.decorator';

export class QueryProductDto extends PartialType(
  IntersectionType(QueryDTO, PickType(Product, queryProductDTO)),
) {
  @ApiPropertyEnum(queryProductDTO, { required: false })
  @IsOptional()
  @IsString()
  @IsIn(queryProductDTO)
  sort: string;

  @ApiPropertyOptional()
  @IsOptional()
  price: string;
}
