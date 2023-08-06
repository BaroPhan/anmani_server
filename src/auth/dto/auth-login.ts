import { PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { User, loginUserDTO } from 'src/users/entities/user.entity';

export class LoginUserDto extends PickType(User, loginUserDTO) {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
