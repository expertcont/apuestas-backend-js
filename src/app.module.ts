import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PostgresModule } from './infra/database/postgres/postgres.module';
import { ApuestasModule } from './apuestas/apuestas.module';

@Module({
  imports: [
    PostgresModule,   // <- conexión única y global a PostgreSQL
    ApuestasModule,   // <- módulo de apuestas
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

