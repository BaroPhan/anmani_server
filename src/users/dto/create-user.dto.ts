import { PickType } from '@nestjs/swagger';
import { User, createUserDTO } from '../entities/user.entity';

export class CreateUserDto extends PickType(User, createUserDTO) {}
