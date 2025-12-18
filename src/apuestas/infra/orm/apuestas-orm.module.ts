import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApuestaOrmEntity } from './apuesta-orm.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApuestaOrmEntity]), // 🔴 CLAVE
  ],
  exports: [
    TypeOrmModule, // expone Repository<ApuestaOrmEntity>
  ],
})
export class ApuestasOrmModule {}
