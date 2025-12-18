import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { ApuestasService } from '../../application/services/apuestas.service';
import { CreateApuestaDto } from '../dto/create-apuesta.dto';

@Controller('apuestas')
export class ApuestasController {
  constructor(
    private readonly apuestasService: ApuestasService,
  ) {}

  // --------------------------------------------------
  // Obtener apuestas por usuario
  // GET /apuestas/usuario/:id_usuario
  // --------------------------------------------------
  @Get('usuario/:id_usuario')
  async obtenerTodas(
    @Param('id_usuario') id_usuario: string,
  ) {
    return this.apuestasService.obtenerTodas(id_usuario);
  }

  // --------------------------------------------------
  // Obtener detalle de una apuesta
  // GET /apuestas/detalle/:id
  // --------------------------------------------------
  @Get('detalle/:id')
  async obtenerApuesta(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.apuestasService.obtenerPorId(id);
  }

  // --------------------------------------------------
  // Crear apuesta
  // POST /apuestas
  // --------------------------------------------------
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crearApuesta(
    @Body() dto: CreateApuestaDto,
  ) {
    return this.apuestasService.crear(dto);
  }

  // --------------------------------------------------
  // Cerrar apuesta
  // POST /apuestas/:id/cerrar
  // --------------------------------------------------
  @Post(':id/cerrar')
  async cerrarApuesta(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.apuestasService.cerrar(id);
  }

  // --------------------------------------------------
  // Cancelar apuesta
  // POST /apuestas/:id/cancelar
  // --------------------------------------------------
  @Post(':id/cancelar')
  async cancelarApuesta(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.apuestasService.cancelar(id);
  }
}
