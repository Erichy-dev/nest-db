import { OrdenTrabajoDetalleEntity } from '../entity';
import { OrdenTrabajo } from './ordenTrabajo';
import { BaseEntity } from './baseEntity';

export class OrdenTrabajoDetalle extends BaseEntity {
  descripcion: string;
  costo: number;
  ordenTrabajo: OrdenTrabajo;

  constructor(entity: OrdenTrabajoDetalleEntity) {
    super(entity.id, entity.createdAt, entity.updatedAt, entity.active);
    this.descripcion = entity.descripcion;
    this.costo = entity.costo;
    this.ordenTrabajo = OrdenTrabajo.fromEntity(entity.ordenTrabajo);
  }

  static fromEntity(entity: OrdenTrabajoDetalleEntity): OrdenTrabajoDetalle {
    return new OrdenTrabajoDetalle(entity);
  }
}
