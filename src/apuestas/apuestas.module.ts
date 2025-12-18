// src/apuestas/apuestas.module.ts

import { Module } from '@nestjs/common';
import { PostgresModule } from '../infra/database/postgres/postgres.module'; // 👈 IMPORTANTE

import { ApuestasOrmModule } from './infra/orm/apuestas-orm.module';
import { OrmModule } from '../infra/database/orm/orm.module';
// Controller
import { ApuestasController } from './interface/controllers/apuestas.controller';

// Service de aplicación (opcional)
import { ApuestasService } from './application/services/apuestas.service';

// UseCases
import { CrearApuestaUseCase } from './application/usecases/crear-apuesta.usecase';
import { ObtenerApuestasUseCase } from './application/usecases/obtener-apuestas.usecase';
import { ObtenerApuestaUseCase } from './application/usecases/obtener-apuesta.usecase';
import { CerrarApuestaUseCase } from './application/usecases/cerrar-apuesta.usecase';
import { CancelarApuestaUseCase } from './application/usecases/cancelar-apuesta.usecase';

// Repositorio concreto
import { ApuestaRepositoryPostgres } from './infra/postgres/apuesta-repository.postgres';
import { ApuestaRepositoryTypeOrm } from './infra/orm/apuesta-repository.orm';

import { ApuestaRepositoryRouter } from './infra/repositories/apuesta.repository.router';

// Token para inyección
import { APUESTA_REPOSITORY } from './domain/repositories/apuesta.repository.token';

import {
  APUESTA_REPO_PG,
  APUESTA_REPO_ORM,
} from './infra/repositories/apuesta.repository.providers';

@Module({
  imports: [
    PostgresModule, // ✅ AHORA Nest ve PostgresService y PG_POOL
    OrmModule,          // conexión TypeORM
    ApuestasOrmModule,  // repositories de apuestas 🔥    
  ],

  controllers: [ApuestasController],

  providers: [
    // Servicio de aplicación
    ApuestasService,

    // UseCases
    CrearApuestaUseCase,
    ObtenerApuestasUseCase,
    ObtenerApuestaUseCase,
    CerrarApuestaUseCase,
    CancelarApuestaUseCase,

    // Implementaciones concretas
    { provide: APUESTA_REPO_PG, useClass: ApuestaRepositoryPostgres },
    { provide: APUESTA_REPO_ORM, useClass: ApuestaRepositoryTypeOrm },

    // Router (el que ve el dominio)
    { provide: APUESTA_REPOSITORY, useClass: ApuestaRepositoryRouter },

  ],

  exports: [
    APUESTA_REPOSITORY,
    CrearApuestaUseCase,
    ObtenerApuestasUseCase,
    ObtenerApuestaUseCase,
    CerrarApuestaUseCase,
    CancelarApuestaUseCase,
  ],
})
export class ApuestasModule {}


/*import { Module } from '@nestjs/common';
import { ApuestasController } from './api/controllers/apuestas.controller';
import { ApuestasService } from './application/services/apuestas.service';

@Module({
  controllers: [ApuestasController],
  providers: [ApuestasService]
})
export class ApuestasModule {}*/
