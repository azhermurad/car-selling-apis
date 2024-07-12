import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(cookieSession({ keys: ['aadfdgsas'] }));
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
 
  // app.useGlobalInterceptors(new CurrentUserInterceptor())
  await app.listen(3000);
}
bootstrap();

