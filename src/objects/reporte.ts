import { ReporteEntity } from '../entity';
import { BaseEntity } from './baseEntity';

export class Reporte extends BaseEntity {
  fecha: Date;

  constructor(entity: ReporteEntity) {
    super(entity.id, entity.createdAt, entity.updatedAt, entity.active);
    this.fecha = entity.fecha;
  }

  static fromEntity(entity: ReporteEntity): Reporte {
    return new Reporte(entity);
  }
}
