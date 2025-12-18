import { Injectable } from '@nestjs/common';
import { PostgresService } from '../../../infra/database/postgres/postgres.service';

import { Apuesta } from '../../domain/entities/apuesta.entity';
import type { IApuestaRepository } from '../../domain/repositories/apuesta.repository.interface';

@Injectable()
export class ApuestaRepositoryPostgres implements IApuestaRepository {

  constructor(private readonly db: PostgresService) {}

  // ---------------------------------------------------------
  // SAVE (crear o actualizar aggregate completo)
  // ---------------------------------------------------------
  async save(apuesta: Apuesta): Promise<Apuesta> {
    const data = apuesta.data;

    // INSERT
    if (!apuesta.id) {
      const sql = `
        INSERT INTO bet_apuesta (
          id_usuario, id_evento, equipo_local, equipo_visitante,
          deporte, liga, pais, monto, cuota, posible_ganancia,
          fecha_evento, fecha_apuesta, apuesta_estado,
          apuesta_resultado
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
        RETURNING id_apuesta;
      `;

      const params = [
        data.id_usuario,
        data.id_evento,
        data.equipo_local,
        data.equipo_visitante,
        data.deporte,
        data.liga,
        data.pais,
        data.monto,
        data.cuota,
        data.posible_ganancia,
        data.fecha_evento,
        data.fecha_apuesta,
        data.apuesta_estado,
        data.apuesta_resultado
      ];

      const result = await this.db.query(sql, params);
      apuesta.asignarId(result[0].id_apuesta);
      return apuesta;
    }

    // UPDATE (estado / resultado ya cambiaron en dominio)
    const sql = `
      UPDATE bet_apuesta SET
        apuesta_estado = $1,
        apuesta_resultado = $2
      WHERE id_apuesta = $3
    `;

    await this.db.query(sql, [
      data.apuesta_estado,
      data.apuesta_resultado,
      apuesta.id
    ]);

    return apuesta;
  }

  // ---------------------------------------------------------
  // FIND BY ID
  // ---------------------------------------------------------
  async findById(id: number): Promise<Apuesta | null> {
    const sql = `SELECT * FROM bet_apuesta WHERE id_apuesta = $1`;
    const rows = await this.db.query(sql, [id]);

    if (!rows.length) return null;

    return this.mapRowToApuesta(rows[0]);
  }

  // ---------------------------------------------------------
  // FIND ALL BY USUARIO
  // ---------------------------------------------------------
  async findAllByUsuario(idUsuario: string): Promise<Apuesta[]> {
    const sql = `
      SELECT * FROM bet_apuesta
      WHERE id_usuario = $1
      ORDER BY id_apuesta DESC
    `;
    const rows = await this.db.query(sql, [idUsuario]);

    return rows.map(r => this.mapRowToApuesta(r));
  }

  // ---------------------------------------------------------
  // MAPPER BD → DOMINIO
  // ---------------------------------------------------------
  private mapRowToApuesta(r: any): Apuesta {
    const apuesta = new Apuesta({
      id_usuario: r.id_usuario,
      id_evento: r.id_evento,
      equipo_local: r.equipo_local,
      equipo_visitante: r.equipo_visitante,
      deporte: r.deporte,
      liga: r.liga,
      pais: r.pais,
      monto: Number(r.monto),
      cuota: Number(r.cuota),
      fecha_evento: r.fecha_evento,
      fecha_apuesta: r.fecha_apuesta,
      apuesta_estado: r.apuesta_estado,
      apuesta_resultado: r.apuesta_resultado
    });

    apuesta.asignarId(r.id_apuesta);
    return apuesta;
  }
}
