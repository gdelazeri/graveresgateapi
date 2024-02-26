import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'GuiDel182325&@#',
  database: 'postgres',
  logging: true,
  synchronize: false,
  entities: ['../models/*.{ts}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
