import { DataSourceOptions } from 'typeorm';
import { ApuestaOrmEntity } from '../../../apuestas/infra/orm/apuesta-orm.entity';

const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [ApuestaOrmEntity],
};

export default ormConfig;
