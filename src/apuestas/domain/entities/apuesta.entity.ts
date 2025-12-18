// src/apuestas/domain/entities/apuesta.entity.ts

import { ApuestaEstado } from '../enums/apuesta-estado.enum';
import { ApuestaResultado } from '../enums/apuesta-resultado.enum';
import { MontoVO } from '../value-objects/monto.vo';
import { CuotaVO } from '../value-objects/cuota.vo';

export class Apuesta {
  private id_apuesta: number | null;

  private id_usuario: string;
  private id_evento: string;
  private equipo_local: string;
  private equipo_visitante: string;
  private deporte: string;
  private liga: string;
  private pais?: string;

  private monto: MontoVO;
  private cuota: CuotaVO;
  private posible_ganancia: number;

  private fecha_evento: Date;
  private fecha_apuesta: Date;

  private apuesta_estado: ApuestaEstado;
  private apuesta_resultado: ApuestaResultado;

  constructor(props: {
    id_apuesta?: number | null;
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
    fecha_apuesta?: Date;
    apuesta_estado?: ApuestaEstado;
    apuesta_resultado?: ApuestaResultado;
  }) {
    this.id_apuesta = props.id_apuesta ?? null;

    this.id_usuario = props.id_usuario;
    this.id_evento = props.id_evento;
    this.equipo_local = props.equipo_local;
    this.equipo_visitante = props.equipo_visitante;
    this.deporte = props.deporte;
    this.liga = props.liga;
    this.pais = props.pais;

    this.monto = new MontoVO(props.monto);
    this.cuota = new CuotaVO(props.cuota);

    this.posible_ganancia = Number(
      (this.monto.value * this.cuota.value).toFixed(2)
    );

    this.fecha_evento = props.fecha_evento;
    this.fecha_apuesta = props.fecha_apuesta ?? new Date();

    this.apuesta_estado = props.apuesta_estado ?? ApuestaEstado.ABIERTA;
    this.apuesta_resultado =
      props.apuesta_resultado ?? ApuestaResultado.PENDIENTE;
  }

  // Getter para serializar la entidad
  get data() {
    return {
      id_apuesta: this.id_apuesta,
      id_usuario: this.id_usuario,
      id_evento: this.id_evento,
      equipo_local: this.equipo_local,
      equipo_visitante: this.equipo_visitante,
      deporte: this.deporte,
      liga: this.liga,
      pais: this.pais,
      monto: this.monto.value,
      cuota: this.cuota.value,
      posible_ganancia: this.posible_ganancia,
      fecha_evento: this.fecha_evento,
      fecha_apuesta: this.fecha_apuesta,
      apuesta_estado: this.apuesta_estado,
      apuesta_resultado: this.apuesta_resultado,
    };
  }

  // --------------------
  //  MÉTODO USADO SOLO POR EL REPOSITORIO
  // --------------------
  asignarId(id: number) {
    if (this.id_apuesta !== null) {
      throw new Error('El ID ya fue asignado.');
    }
    this.id_apuesta = id;
  }

  // --------------------
  //  REGLAS DE NEGOCIO
  // --------------------
  // Por defecto, la apuesta está ABIERTA
  marcarEstadoCerrada() {
    if (this.apuesta_estado !== ApuestaEstado.ABIERTA) {
      throw new Error('Solo una apuesta ABIERTA puede cerrarse.');
    }
    this.apuesta_estado = ApuestaEstado.CERRADA;
  }

  marcarEstadoCancelada() {
    if (this.apuesta_estado === ApuestaEstado.CERRADA) {
      throw new Error('No se puede cancelar una apuesta cerrada.');
    }
    this.apuesta_estado = ApuestaEstado.CANCELADA;
    this.apuesta_resultado = ApuestaResultado.ANULADA;
  }

  private validarResultado() {
    if (this.apuesta_estado !== ApuestaEstado.CERRADA) {
      throw new Error('La apuesta debe estar CERRADA para asignar resultado.');
    }
    if (this.apuesta_resultado !== ApuestaResultado.PENDIENTE) {
      throw new Error('El resultado ya fue definido.');
    }
  }

  // Por defecto, el resultado de la apuesta está PENDIENTE, puede ser GANADA, PERDIDA o ANULADA
  marcarResultadoGanada() {
    this.validarResultado();
    this.apuesta_resultado = ApuestaResultado.GANADA;
  }

  marcarResultadoPerdida() {
    this.validarResultado();
    this.apuesta_resultado = ApuestaResultado.PERDIDA;
  }

  marcarResultadoAnulada() {
    this.validarResultado();
    this.apuesta_resultado = ApuestaResultado.ANULADA;
  }

  // Nuevo método que reemplaza a `registrado`
  // Determina si la apuesta contribuye al total basado en su estado y resultado
  get montoContabilizable(): number {
    if (
      this.apuesta_estado === ApuestaEstado.CANCELADA ||
      this.apuesta_resultado === ApuestaResultado.ANULADA
    ) {
      return 0;
    }
    return this.monto.value;
  }

  // 👇 Getter semántico, evita usar public en id_apuesta
  get id(): number | null {
    return this.id_apuesta;
  }
  /////
}
