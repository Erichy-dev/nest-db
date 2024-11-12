import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { OrdenTrabajoEntity } from './ordenTrabajo.entity';
import { CotizacionDetalleEntity } from './cotizacionDetalle.entity';
import { ModeloEntity } from './modelo.entity';

@Entity('cotizacion')
export class CotizacionEntity extends BaseEntity {
  @Column()
  neto: number;

  @Column()
  iva: number;

  @Column()
  total: number;

  @ManyToOne(
    () => OrdenTrabajoEntity,
    (ordenTrabajo) => ordenTrabajo.cotizaciones,
    {
      nullable: true,
    },
  )
  ordenTrabajo: OrdenTrabajoEntity;

  @OneToMany(() => CotizacionDetalleEntity, (detalle) => detalle.cotizacion)
  detalle: CotizacionDetalleEntity[];

  @ManyToOne(() => ModeloEntity, (modelo) => modelo.cotizaciones, {
    nullable: true,
  })
  modelo: ModeloEntity;
}
