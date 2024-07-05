import { plainToInstance } from 'class-transformer';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export const Serializer = function (UserDto: any) {
  return UseInterceptors(new SerializerInterceptor(UserDto));
};

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  constructor(private dataDto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value: any) => {
        return plainToInstance(this.dataDto, value, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}


