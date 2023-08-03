import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUrl } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { IsExist } from 'src/validation/isExist.validation';

enum Type {
  UPDATE = 'update',
  INFO = 'info',
}
export class CreateNotificationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Type)
  type: Type;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  avatar: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsExist(User)
  userId: string;
}
