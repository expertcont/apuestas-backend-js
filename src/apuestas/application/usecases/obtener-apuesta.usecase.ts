// src/apuestas/application/usecases/obtener-apuesta.usecase.ts
import { Injectable, Inject } from '@nestjs/common';
import type { IApuestaRepository } from '../../domain/repositories/apuesta.repository.interface';
import { APUESTA_REPOSITORY } from '../../domain/repositories/apuesta.repository.token';
import { ApuestaNoEncontradaError } from './apuesta.errors';

@Injectable()
export class ObtenerApuestaUseCase {
  constructor(
    @Inject(APUESTA_REPOSITORY)
    private readonly repo: IApuestaRepository,
  ) {}

  async execute(id: number) {
    // 1️⃣ Buscar la apuesta por ID usando el puerto
    const apuesta = await this.repo.findById(id);

    // 2️⃣ Lanzar error de dominio si no existe
    if (!apuesta) {
      throw new ApuestaNoEncontradaError(id);
    }

    // 3️⃣ Retornar la entidad de dominio
    return apuesta;
  }
}
