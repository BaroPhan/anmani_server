import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { IsExist } from 'src/validation/isExist.validation';
import { Video } from 'src/videos/entities/video.entity';

enum Type {
  VIDEO = 'video',
  PRODUCT = 'product',
}
export class CreateBookmarkDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  @IsExist(User)
  userId: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  @IsExist(Product)
  productId: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  @IsExist(Video)
  videoId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Type)
  type: Type;
}
