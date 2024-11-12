import { Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { TrabajoEntity } from './trabajo.entity';
import { CotizacionEntity } from './cotizacion.entity';

@Entity('cotizacion_detalle')
export class CotizacionDetalleEntity extends BaseEntity {
  @ManyToOne(() => CotizacionEntity, (cotizacion) => cotizacion.detalle)
  cotizacion: CotizacionEntity;

  @ManyToMany(() => TrabajoEntity, (Trabajo) => Trabajo.cotizaciones)
  @JoinTable()
  trabajos: TrabajoEntity[];
}
