// src/apuestas/application/use-cases/crear-apuesta.usecase.ts
import { Injectable, Inject } from '@nestjs/common';
import type { IApuestaRepository } from '../../domain/repositories/apuesta.repository.interface';
import { APUESTA_REPOSITORY } from '../../domain/repositories/apuesta.repository.token';
import { Apuesta } from '../../domain/entities/apuesta.entity';

@Injectable()
export class CrearApuestaUseCase {
  constructor(
    @Inject(APUESTA_REPOSITORY)
    private readonly apuestaRepository: IApuestaRepository,
  ) {}

  async execute(data: {
    id_usuario: string;
    id_evento: string;
    equipo_local: string;
    equipo_visitante: string;
    deporte: string;
    liga: string;
    pais?: string;
    monto: number;
    cuota: number;
    fecha_evento: Date;
  }) {
    // 1️⃣ Crear entidad de dominio
    const apuesta = new Apuesta({
      id_usuario: data.id_usuario,
      id_evento: data.id_evento,
      equipo_local: data.equipo_local,
      equipo_visitante: data.equipo_visitante,
      deporte: data.deporte,
      liga: data.liga,
      pais: data.pais,
      monto: data.monto,
      cuota: data.cuota,
      fecha_evento: data.fecha_evento,
    });

    // 2️⃣ Persistir a través del puerto (repositorio)
    return this.apuestaRepository.save(apuesta);
  }
}
