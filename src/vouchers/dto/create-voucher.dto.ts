import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';
import { IsExist } from 'src/validation/isExist.validation';

enum Option {
  AMOUNT = 'amount',
  PERCENTAGE = 'percentage',
}
export class CreateVoucherDto {
  @ApiProperty({ type: Product })
  @IsNotEmpty()
  @IsExist(Product)
  product: Product;

  @ApiProperty()
  @IsNotEmpty()
  condition: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Option)
  option: Option;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  percentage: number;
}
