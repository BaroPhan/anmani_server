import { Cart } from 'src/carts/entities/cart.entity';
import { PartialType, OmitType, ApiProperty, PickType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCartDto extends PartialType(CreateCartDto) {}

class ProductDetails extends OmitType(CreateCartDto, ['userId']) {}
export class UpdateManyCartsDto extends PickType(Cart, ['userId']) {
  @ApiProperty({ type: ProductDetails, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductDetails)
  products: ProductDetails[];
}
