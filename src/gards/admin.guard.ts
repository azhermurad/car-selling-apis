import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../users/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const currentUser: User | undefined = context
      .switchToHttp()
      .getRequest().currentUser;
      
    if (!currentUser) {
      return false;
    }
    return currentUser && currentUser.isAdmin;
  }
}


