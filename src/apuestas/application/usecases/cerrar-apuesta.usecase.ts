import { Injectable, Inject } from '@nestjs/common';
import type { IApuestaRepository } from '../../domain/repositories/apuesta.repository.interface';
import { APUESTA_REPOSITORY } from '../../domain/repositories/apuesta.repository.token';
import { ApuestaNoEncontradaError } from './apuesta.errors'; // opcional separar error

@Injectable()
export class CerrarApuestaUseCase {
  constructor(
    @Inject(APUESTA_REPOSITORY)
    private readonly repo: IApuestaRepository,
  ) {}

  async execute(id: number) {
    const apuesta = await this.repo.findById(id);

    if (!apuesta) {
      throw new ApuestaNoEncontradaError(id);
    }

    apuesta.marcarEstadoCerrada();

    return this.repo.save(apuesta);
  }
}
