export class ApuestaNoEncontradaError extends Error {
    constructor(id: number) {
      super(`Apuesta con ID ${id} no encontrada`);
    }
  }
  
  export class ApuestaEstadoInvalidoError extends Error {
    constructor(mensaje?: string) {
      super(mensaje ?? 'El estado de la apuesta no permite esta operación');
    }
  }
  