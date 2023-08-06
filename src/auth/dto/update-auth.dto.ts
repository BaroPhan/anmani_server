import { PartialType } from '@nestjs/swagger';
import { RegisterUserDto } from './auth-register';

export class UpdateAuthDto extends PartialType(RegisterUserDto) {}
