// src/apuestas/domain/interfaces/apuesta.repository.interface.ts

import { Apuesta } from '../entities/apuesta.entity';

export interface IApuestaRepository {
  save(apuesta: Apuesta): Promise<Apuesta>;
  findById(id: number): Promise<Apuesta | null>;
  findAllByUsuario(idUsuario: string): Promise<Apuesta[]>;
}

/*export interface IApuestaRepository {
  crear(apuesta: Apuesta): Promise<Apuesta>;
  obtenerPorId(idApuesta: number): Promise<Apuesta | null>;
  obtenerTodas(idUsuario: string): Promise<Apuesta[]>;
}*/
//Ni de vainas reglas de negocio en el repository
//actualizarEstado(id: number, estado: string): Promise<void>;
//actualizarResultado(id: number, resultado: string): Promise<void>;

