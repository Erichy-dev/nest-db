import { BaseEntity } from './baseEntity';
import { Cotizacion } from './cotizacion';
import { Trabajo } from './trabajo';
import { CotizacionDetalleEntity } from '../entity';

export class CotizacionDetalle extends BaseEntity {
  cotizacion: Cotizacion;
  trabajo: Trabajo[];
  constructor(entity: CotizacionDetalleEntity) {
    super(entity.id, entity.createdAt, entity.updatedAt, entity.active);
    this.cotizacion = Cotizacion.fromEntity(entity.cotizacion);
    this.trabajo = entity.trabajos
      ? entity.trabajos.map((trabajo) => new Trabajo(trabajo))
      : [];
  }

  static fromEntity(entity: CotizacionDetalleEntity): CotizacionDetalle {
    return new CotizacionDetalle(entity);
  }
}
