import { PickType } from '@nestjs/swagger';
import { User, createUserDTO } from 'src/users/entities/user.entity';

export class RegisterUserDto extends PickType(User, createUserDTO) {}
