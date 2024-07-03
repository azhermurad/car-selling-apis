// first step we have to make a interceptor so it will run before the
// request is called
// get the userid from session
// fetch the user from the database
// make a user to the request
// so the user can get the request in the controllers

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const { userId } = context.switchToHttp().getRequest().session;
    
    if(userId){
        const user = await this.userService.getUserByID(userId)
        context.switchToHttp().getRequest().currentUser = user
    }
    return next.handle();
  }
}


