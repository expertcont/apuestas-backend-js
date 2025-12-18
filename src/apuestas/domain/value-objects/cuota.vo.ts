// src/apuestas/domain/value-objects/cuota.vo.ts

export class CuotaVO {
    readonly value: number;
  
    constructor(value: number) {
      if (value < 1) {
        throw new Error('La cuota debe ser mayor o igual a 1.00.');
      }
  
      if (!Number.isFinite(value)) {
        throw new Error('La cuota no es un número válido.');
      }
  
      this.value = Number(value.toFixed(2));
    }
  }
  