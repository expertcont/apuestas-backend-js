//Resumen de usecase para referencia el app.module.ts (general)

import { CrearApuestaUseCase } from './application/usecases/crear-apuesta.usecase';
import { ObtenerApuestasUseCase } from './application/usecases/obtener-apuestas.usecase';
import { ObtenerApuestaUseCase } from './application/usecases/obtener-apuesta.usecase';
import { CerrarApuestaUseCase } from './application/usecases/cerrar-apuesta.usecase';
import { CancelarApuestaUseCase } from './application/usecases/cancelar-apuesta.usecase';

export const APUESTAS_USECASES = [
  CrearApuestaUseCase,
  ObtenerApuestasUseCase,
  ObtenerApuestaUseCase,
  CerrarApuestaUseCase,
  CancelarApuestaUseCase,
];
