import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
   const currentUser = context.switchToHttp().getRequest().currentUser
    return currentUser;
  },
);
