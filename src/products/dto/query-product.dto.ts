import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { QueryDTO } from 'src/utils/helper.utils';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { Product, createProductDTO } from '../entities/product.entity';
import { ApiPropertyEnum } from 'src/decorators/swagger.decorator';

export class QueryProductDto extends PartialType(
  IntersectionType(QueryDTO, PickType(Product, createProductDTO)),
) {
  @ApiPropertyEnum(createProductDTO)
  @IsOptional()
  @IsString()
  @IsIn(createProductDTO)
  sort: string;
}
