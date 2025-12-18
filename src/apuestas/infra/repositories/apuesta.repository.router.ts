// src/apuestas/infra/repositories/apuesta-repository.router.ts
import { Inject, Injectable } from '@nestjs/common';
import type { IApuestaRepository } from '../../domain/repositories/apuesta.repository.interface';
import { APUESTA_REPO_PG, APUESTA_REPO_ORM } from './apuesta.repository.providers';

@Injectable()
export class ApuestaRepositoryRouter implements IApuestaRepository {
  constructor(
    @Inject(APUESTA_REPO_PG)
    private readonly pgRepo: IApuestaRepository,

    @Inject(APUESTA_REPO_ORM)
    private readonly ormRepo: IApuestaRepository,
  ) {}

  save(apuesta) {
    return this.pgRepo.save(apuesta);
  }

  findById(id: number) {
    return this.ormRepo.findById(id);
  }

  findAllByUsuario(idUsuario: string) {
    return this.ormRepo.findAllByUsuario(idUsuario);
  }
}
