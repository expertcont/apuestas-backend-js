// src/apuestas/application/usecases/obtener-apuestas.usecase.ts
import { Injectable, Inject } from '@nestjs/common';
import type { IApuestaRepository } from '../../domain/repositories/apuesta.repository.interface';
import { APUESTA_REPOSITORY } from '../../domain/repositories/apuesta.repository.token';

@Injectable()
export class ObtenerApuestasUseCase {
  constructor(
    @Inject(APUESTA_REPOSITORY)
    private readonly repo: IApuestaRepository,
  ) {}

  async execute(idUsuario: string) {
    // Retorna todas las apuestas del usuario usando el puerto (repositorio)
    return this.repo.findAllByUsuario(idUsuario);
  }
}
