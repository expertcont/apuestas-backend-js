import { Injectable } from '@nestjs/common';
import { CrearApuestaUseCase } from '../usecases/crear-apuesta.usecase';
import { ObtenerApuestasUseCase } from '../usecases/obtener-apuestas.usecase';
import { ObtenerApuestaUseCase } from '../usecases/obtener-apuesta.usecase';
import { CerrarApuestaUseCase } from '../usecases/cerrar-apuesta.usecase';
import { CancelarApuestaUseCase } from '../usecases/cancelar-apuesta.usecase';

@Injectable()
export class ApuestasService {
  constructor(
    private readonly crearApuestaUC: CrearApuestaUseCase,
    private readonly obtenerApuestasUC: ObtenerApuestasUseCase,
    private readonly obtenerApuestaUC: ObtenerApuestaUseCase,
    private readonly cerrarApuestaUC: CerrarApuestaUseCase,
    private readonly cancelarApuestaUC: CancelarApuestaUseCase,
  ) {}

  obtenerTodas(idUsuario: string) {
    return this.obtenerApuestasUC.execute(idUsuario);
  }

  obtenerPorId(id: number) {
    return this.obtenerApuestaUC.execute(id);
  }

  crear(data: {
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
    return this.crearApuestaUC.execute(data);
  }

  //Uso de reglas de negocio Estado de Apuesta
  ///////////////////////////////////////////////
  cerrar(id: number) {
    return this.cerrarApuestaUC.execute(id);
  }

  cancelar(id: number) {
    return this.cancelarApuestaUC.execute(id);
  }

  //Uso de reglas de negocio Resultado de Apuesta
  ///////////////////////////////////////////////

}
