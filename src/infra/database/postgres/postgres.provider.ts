import { Pool } from 'pg';

export const PG_POOL = 'PG_POOL';

export const PostgresProvider = {
  provide: PG_POOL,
  useFactory: async () => {
    const pool = new Pool({
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DB,
    });

    console.log('🔌 PostgreSQL pool inicializado');
    return pool;
  },
};
