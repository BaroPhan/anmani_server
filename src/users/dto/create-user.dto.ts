import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { Role } from 'src/roles/entities/role.entity';
import { IsExist } from 'src/utils/validation.utils';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password?: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: Role })
  @IsNotEmpty()
  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  role: Role;
}
