import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from 'src/decorators/isPublic.decorator';

export enum RolesEnum {
  ADMIN = 'admin',
  USER = 'user',
}
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<RolesEnum[]>(ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRole) return true;
    const { user } = context.switchToHttp().getRequest();
    return requiredRole.some((role) => user.role?.name === role);
  }
}
