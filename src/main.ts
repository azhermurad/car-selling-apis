import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieSession from 'cookie-session';
// const cookieSession = require("cookie-session")

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cookieSession({
  //   keys: ["secrete"]
  // }))
  app.use(cookieSession({ keys: ['aadfdgsas'] }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // app.use(()=>{
  //   console.log("this is middle ware")
  // })
  await app.listen(3000);
}
bootstrap();
