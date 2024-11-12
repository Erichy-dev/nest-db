import { CotizacionEntity } from '../entity';
import { OrdenTrabajo } from './ordenTrabajo';
import { BaseEntity } from './baseEntity';
import { CotizacionDetalle } from './cotizacionDetalle';
import { Modelo } from './modelo';

export class Cotizacion extends BaseEntity {
  neto: number;
  iva: number;
  total: number;
  ordenTrabajo: OrdenTrabajo;
  detalle: CotizacionDetalle[];
  modelo: Modelo;

  constructor(entity: CotizacionEntity) {
    super(entity.id, entity.createdAt, entity.updatedAt, entity.active);
    this.neto = entity.neto;
    this.iva = entity.iva;
    this.total = entity.total;
    this.ordenTrabajo = OrdenTrabajo.fromEntity(entity.ordenTrabajo);
    this.detalle = entity.detalle
      ? entity.detalle.map((detalle) => CotizacionDetalle.fromEntity(detalle))
      : [];
    this.modelo = Modelo.fromEntity(entity.modelo);
  }

  static fromEntity(entity: CotizacionEntity): Cotizacion {
    return new Cotizacion(entity);
  }
}
