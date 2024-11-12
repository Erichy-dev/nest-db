import { TrabajoEntity } from '../entity';
import { BaseEntity } from './baseEntity';
import { OrdenTrabajoDetalle } from './ordenTrabajoDetalle';
import { CotizacionDetalle } from './cotizacionDetalle';
import { Actividad } from './actividad';

export class Trabajo extends BaseEntity {
  nombre: string;
  ordenesTrabajo: OrdenTrabajoDetalle[];
  cotizaciones: CotizacionDetalle[];
  actividades: Actividad[];

  constructor(entity: TrabajoEntity) {
    super(entity.id, entity.createdAt, entity.updatedAt, entity.active);
    this.nombre = entity.nombre;
    this.ordenesTrabajo = entity.ordenesTrabajo
      ? entity.ordenesTrabajo.map((orden) => new OrdenTrabajoDetalle(orden))
      : [];
    this.cotizaciones = entity.cotizaciones
      ? entity.cotizaciones.map(
          (cotizacion) => new CotizacionDetalle(cotizacion),
        )
      : [];
    this.actividades = entity.actividades
      ? entity.actividades.map((actividad) => new Actividad(actividad))
      : [];
  }

  static fromEntity(entity: TrabajoEntity): Trabajo {
    return new Trabajo(entity);
  }
}
