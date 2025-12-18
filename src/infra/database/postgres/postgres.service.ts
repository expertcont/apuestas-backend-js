import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_POOL } from './postgres.provider';

@Injectable()
export class PostgresService {
  constructor(
    @Inject(PG_POOL) private readonly pool: Pool,
  ) {}

  async query(sql: string, params?: any[]) {
    const result = await this.pool.query(sql, params);
    return result.rows;
  }
}
