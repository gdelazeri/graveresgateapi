import { DataSource, DataSourceOptions } from 'typeorm';
import migrations from './migrations';
import models from './models';
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USERNAME } from './config/environment';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: DATABASE_HOST,
  port: 5432,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  logging: true,
  synchronize: false,
  ssl: true,
  migrations: [...migrations],
  entities: [...models],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
