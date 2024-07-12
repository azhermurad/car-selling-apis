import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

ConfigModule.forRoot({
  envFilePath: `.env.${process.env.NODE_ENV}`,
});
const configService = new ConfigService();

// PERFECT JOB DONE
console.log(
  process.env.NODE_ENV,
  __dirname,
  configService.get<string>('DATABASE_NAME'),
  configService.get<string>('NODE_ENV'),

);

export const dataSourceOptions: Partial<DataSourceOptions> = {
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  migrations: ['dist/migration/*.js'],
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dataSourceOptions, {
      type: 'sqlite',
      database: 'db.sqlite',
      // migrationsRun: true,
    } as DataSourceOptions);
    break;
  case 'test':
    Object.assign(dataSourceOptions, {
      type: 'sqlite',
      database: 'test.sqlite',
      migrationsRun: true,
      // synchronize:true
    } as DataSourceOptions);
    break;
  case 'production':
    Object.assign(dataSourceOptions, {
      type: 'sqlite',
      database: 'production.sqlite',
      migrationsRun: true,
      // synchronize:true
    } as DataSourceOptions);
    break;
  default:
    throw new Error('unknown environment');
}

const dataSource = new DataSource(dataSourceOptions as DataSourceOptions);
export default dataSource;

//

// '**/*.js'; All files with the extension .js from here onwards.

// 'lib/**/*.js'; All files with the extension .js in the folder lib and its subfolders.

// 'js/**'; All files in the folder js and its subfolders.
