// src/apuestas/infra/orm/apuesta-repository.orm.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ApuestaOrmEntity } from './apuesta-orm.entity';
import { ApuestaEstado } from '../../domain/enums/apuesta-estado.enum';
import { ApuestaResultado } from '../../domain/enums/apuesta-resultado.enum';
import { Apuesta } from '../../domain/entities/apuesta.entity';
import type { IApuestaRepository } from '../../domain/repositories/apuesta.repository.interface';

@Injectable()
export class ApuestaRepositoryTypeOrm implements IApuestaRepository {
  constructor(
    @InjectRepository(ApuestaOrmEntity)
    private readonly repo: Repository<ApuestaOrmEntity>,
  ) {}

  // ---------------------------------------------------------
  // SAVE (crear o actualizar aggregate completo)
  // ---------------------------------------------------------
  async save(apuesta: Apuesta): Promise<Apuesta> {
    const data = apuesta.data;

    //let entity: ApuestaOrmEntity;
    let entity: ApuestaOrmEntity | null;

    if (!apuesta.id) {
      // CREATE
      entity = this.repo.create({
        id_usuario: data.id_usuario,
        id_evento: data.id_evento,
        equipo_local: data.equipo_local,
        equipo_visitante: data.equipo_visitante,
        deporte: data.deporte,
        liga: data.liga,
        pais: data.pais,
        monto: data.monto,
        cuota: data.cuota,
        posible_ganancia: data.posible_ganancia,
        fecha_evento: data.fecha_evento,
        fecha_apuesta: data.fecha_apuesta,
        apuesta_estado: data.apuesta_estado,
        apuesta_resultado: data.apuesta_resultado
      });
    } else {
      // UPDATE
      entity = await this.repo.findOneBy({ id_apuesta: apuesta.id });
      if (!entity) throw new Error(`Apuesta ${apuesta.id} no encontrada en BD`);

      entity.apuesta_estado = data.apuesta_estado;
      entity.apuesta_resultado = data.apuesta_resultado;
      entity.monto = data.monto;
      entity.cuota = data.cuota;
      entity.posible_ganancia = data.posible_ganancia;
    }

    const saved = await this.repo.save(entity);
    apuesta.asignarId(saved.id_apuesta);

    return apuesta;
  }

  // ---------------------------------------------------------
  // FIND BY ID
  // ---------------------------------------------------------
  async findById(id: number): Promise<Apuesta | null> {
    const entity = await this.repo.findOneBy({ id_apuesta: id });
    if (!entity) return null;
    return this.mapEntityToDomain(entity);
  }

  // ---------------------------------------------------------
  // FIND ALL BY USUARIO
  // ---------------------------------------------------------
  async findAllByUsuario(idUsuario: string): Promise<Apuesta[]> {
    const entities = await this.repo.find({
      where: { id_usuario: idUsuario },
      order: { id_apuesta: 'DESC' },
    });
    return entities.map(e => this.mapEntityToDomain(e));
  }

  // ---------------------------------------------------------
  // MAPPER ORM → DOMINIO
  // ---------------------------------------------------------
  private mapEntityToDomain(e: ApuestaOrmEntity): Apuesta {
    const apuesta = new Apuesta({
      id_apuesta: e.id_apuesta,
      id_usuario: e.id_usuario,
      id_evento: e.id_evento,
      equipo_local: e.equipo_local,
      equipo_visitante: e.equipo_visitante,
      deporte: e.deporte,
      liga: e.liga,
      pais: e.pais,
      monto: Number(e.monto),
      cuota: Number(e.cuota),
      fecha_evento: e.fecha_evento,
      fecha_apuesta: e.fecha_apuesta,
      apuesta_estado: e.apuesta_estado as ApuestaEstado, // casteo explícito al enum del dominio
      apuesta_resultado: e.apuesta_resultado as ApuestaResultado, // casteo explícito al enum del dominio
    });

    return apuesta;
  }
}
