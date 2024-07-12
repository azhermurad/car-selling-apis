// how to implement roles base guard

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../users/decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const currentUser = context.switchToHttp().getRequest().currentUser;
    const roles = this.reflector.get(Roles, context.getHandler());
    console.log(roles);
    
    if (!roles) {
      return true;
    }

    return roles.includes(currentUser.role);
  }
}
