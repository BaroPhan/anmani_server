import { PickType } from '@nestjs/swagger';
import { Role, createRoleDTO } from '../entities/role.entity';

export class CreateRoleDto extends PickType(Role, createRoleDTO) {}
