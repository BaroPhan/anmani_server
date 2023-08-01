import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { IsExist } from 'src/validation/isExist.validation';

export class CreateCartDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsExist(User)
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsExist(Product)
  productId: string;

  @ApiProperty()
  @IsNotEmpty()
  status: string;
}
