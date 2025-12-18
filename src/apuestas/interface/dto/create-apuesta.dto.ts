import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateApuestaDto {
  @IsString()
  id_usuario: string;

  @IsString()
  id_evento: string;

  @IsString()
  equipo_local: string;

  @IsString()
  equipo_visitante: string;

  @IsString()
  deporte: string;

  @IsString()
  liga: string;

  @IsOptional()
  @IsString()
  pais?: string;

  @IsNumber()
  monto: number;

  @IsNumber()
  cuota: number;

  @IsDate()
  fecha_evento: Date;
}
