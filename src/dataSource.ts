import { DataSource, DataSourceOptions } from 'typeorm';
import migrations from './migrations';
import models from './models';
import { DATABASE_PASSWORD } from './config/environment';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: DATABASE_PASSWORD,
  database: 'postgres',
  logging: true,
  synchronize: false,
  migrations: [...migrations],
  entities: [...models]
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
