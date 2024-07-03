
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<string[]>();


// relector decorator are used to add some data to the router handler
// using this we can pass data to guard, interceptors etc