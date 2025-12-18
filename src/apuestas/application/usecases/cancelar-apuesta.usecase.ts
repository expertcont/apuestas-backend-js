// src/apuestas/application/usecases/cancelar-apuesta.usecase.ts
import { Injectable, Inject } from '@nestjs/common';
import type { IApuestaRepository } from '../../domain/repositories/apuesta.repository.interface';
import { APUESTA_REPOSITORY } from '../../domain/repositories/apuesta.repository.token';
import { ApuestaNoEncontradaError } from './apuesta.errors'; // opcional separar error

@Injectable()
export class CancelarApuestaUseCase {
  constructor(
    @Inject(APUESTA_REPOSITORY)
    private readonly repo: IApuestaRepository,
  ) {}

  async execute(id: number) {
    // 1️⃣ Buscar la apuesta por ID
    const apuesta = await this.repo.findById(id);

    if (!apuesta) {
      throw new ApuestaNoEncontradaError(id);
    }

    // 2️⃣ Aplicar la regla de negocio en la entidad
    apuesta.marcarEstadoCancelada();

    // 3️⃣ Persistir cambios usando el repositorio (puerto)
    return this.repo.save(apuesta);
  }
}
