import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import cookieSession from 'cookie-session';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';
// import { dataSourceOptions } from 'orm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'sqlite',
    //     database: configService.get<string>('DATABASE_NAME'),
    //     entities: [User, Report],
    //     synchronize: true,
    //   }),
    //   inject: [ConfigService],
    // }),

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database:"a.sqlite",
      entities: [User, Report],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true, transform: true }),
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    const sessionKey = this.configService.get<string>('SESSION_KEY');
    consumer
      .apply(cookieSession({ keys: [sessionKey] }), CurrentUserMiddleware)
      .forRoutes('*');
  }
}
