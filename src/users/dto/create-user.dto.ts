import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { Role } from 'src/roles/entities/role.entity';
import { Helper } from 'src/utils/helper.utils';
import { IsExist } from 'src/validation/isExist.validation';
import { IsUnique } from 'src/validation/isUnique.validation';
import { User } from '../entities/user.entity';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsUnique(User)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(Helper.regex.phoneNumber)
  @IsUnique(User)
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date;

  @ApiProperty({ type: Role })
  @IsNotEmpty()
  @IsExist(Role)
  role: Role;
}
