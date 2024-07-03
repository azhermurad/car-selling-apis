import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { Roles } from 'src/users/decorators/role.decorator';


@Injectable()
export class AuthGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): any {
    // const roles = this.reflector.get(Roles, context.getHandler());
    console.log('guard is running using the metadata decorator function');
    const request = context.switchToHttp().getRequest();
    return request.session.userId;
  }
}
