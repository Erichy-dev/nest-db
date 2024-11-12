import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { ActividadEntity } from './actividad.entity';
import { OrdenTrabajoDetalleEntity } from './ordenTrabajoDetalle.entity';
import { CotizacionDetalleEntity } from './cotizacionDetalle.entity';

@Entity('trabajo')
export class TrabajoEntity extends BaseEntity {
  @Column()
  nombre: string;

  @Column()
  neto: number;

  @Column()
  iva: number;

  @Column()
  total: number;

  @ManyToMany(
    () => OrdenTrabajoDetalleEntity,
    (ordenTrabajo) => ordenTrabajo.trabajos,
  )
  ordenesTrabajo: OrdenTrabajoDetalleEntity[];

  @ManyToMany(() => CotizacionDetalleEntity, (cotizacion) => cotizacion.trabajos)
  cotizaciones: CotizacionDetalleEntity[];

  @ManyToMany(() => ActividadEntity, (actividad) => actividad.trabajos)
  actividades: ActividadEntity[];
}
