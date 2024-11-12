import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { OrdenTrabajoEntity } from './ordenTrabajo.entity';
import { TrabajoEntity } from './trabajo.entity';

@Entity('orden_trabajo_detalle')
export class OrdenTrabajoDetalleEntity extends BaseEntity {
  @Column()
  descripcion: string;

  @Column({
    type: 'decimal',
  })
  costo: number;

  @ManyToOne(() => OrdenTrabajoEntity, (ordenTrabajo) => ordenTrabajo.detalles)
  ordenTrabajo: OrdenTrabajoEntity;

  @ManyToMany(() => TrabajoEntity, (Trabajo) => Trabajo.ordenesTrabajo)
  @JoinTable()
  trabajos: TrabajoEntity[];
}
