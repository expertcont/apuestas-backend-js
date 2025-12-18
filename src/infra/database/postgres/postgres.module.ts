import { Module } from '@nestjs/common';
import { PostgresProvider, PG_POOL } from './postgres.provider';
import { PostgresService } from './postgres.service';

@Module({
  providers: [PostgresProvider, PostgresService],
  exports: [PostgresService, PG_POOL],
})
export class PostgresModule {}
