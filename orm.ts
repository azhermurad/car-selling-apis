import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './src/users/user.entity';

import { DataSource, DataSourceOptions } from 'typeorm';
import { Report } from './src/reports/report.entity';

ConfigModule.forRoot({
  envFilePath: `.env.${process.env.NODE_ENV}`,
});

const configService = new ConfigService();

console.log(
  process.env.NODE_ENV,
  'testingggggggggggggggggggggggggggggggggggggg',
  configService.get<string>('DATABASE_NAME'),
);

export const dataSourceOptions: Partial<DataSourceOptions> = {
  entities: ["dist/**/*.entity.js"],
  synchronize: false,
  migrations: ['dist/db/*.js'],
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
      synchronize: true,
    } as DataSourceOptions);
    break;
  case 'production':
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