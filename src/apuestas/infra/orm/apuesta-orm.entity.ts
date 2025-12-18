import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('bet_apuesta')
export class ApuestaOrmEntity {

  @PrimaryGeneratedColumn()
  id_apuesta: number;

  @Column()
  id_usuario: string;

  @Column()
  id_evento: string;

  @Column()
  equipo_local: string;

  @Column()
  equipo_visitante: string;

  @Column({ length: 50 })
  deporte: string;

  @Column()
  liga: string;

  @Column({ length: 50, nullable: true })
  pais: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  cuota: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  posible_ganancia: number;

  @Column({ type: 'timestamp' })
  fecha_evento: Date;

  @Column({ type: 'timestamp' })
  fecha_apuesta: Date;

  @Column({
    type: 'enum',
    enum: ['ABIERTA','CERRADA','CANCELADA'],
    default: 'ABIERTA'
  })
  apuesta_estado: string;

  @Column({
    type: 'enum',
    enum: ['GANADA','PERDIDA','ANULADA','PENDIENTE'],
    nullable: true
  })
  apuesta_resultado: string;
}
