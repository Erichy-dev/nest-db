import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { OrdenTrabajoEntity } from './ordenTrabajo.entity';
import { ProductoEntity } from './producto.entity';

@Entity('orden_trabajo_producto')
export class OrdenTrabajoProductoEntity extends BaseEntity {
  @ManyToOne(
    () => OrdenTrabajoEntity,
    (ordenTrabajo) => ordenTrabajo.ordenesTrabajoProductos,
  )
  ordenTrabajo: OrdenTrabajoEntity;

  @ManyToOne(
    () => ProductoEntity,
    (producto) => producto.ordenesTrabajoProductos,
  )
  producto: ProductoEntity;

  @Column()
  cantidad: number;
}
