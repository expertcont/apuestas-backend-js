// src/apuestas/domain/value-objects/monto.vo.ts

export class MontoVO {
    readonly value: number;
  
    constructor(value: number) {
      if (value <= 0) {
        throw new Error('El monto debe ser mayor que cero.');
      }
  
      if (!Number.isFinite(value)) {
        throw new Error('El monto no es un número válido.');
      }
  
      this.value = Number(value.toFixed(2));
    }
  }
  