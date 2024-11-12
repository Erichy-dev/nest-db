import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { OrdenTrabajoProductoEntity } from './ordenTrabajoProducto.entity';
import { ModeloEntity } from './modelo.entity';
import { CompraDetalleEntity } from './compraDetalle.entity';
import { CategoriaEntity } from './categoria.entity';

@Entity('producto')
export class ProductoEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
    comment: 'Nombre producto',
  })
  nombre: string;

  @OneToMany(
    () => CompraDetalleEntity,
    (compraDetalle) => compraDetalle.producto,
  )
  comprasDetalles: CompraDetalleEntity[];

  @ManyToMany(
    () => OrdenTrabajoProductoEntity,
    (ordenTrabajoProducto) => ordenTrabajoProducto.producto,
  )
  ordenesTrabajoProductos: OrdenTrabajoProductoEntity[];

  @ManyToOne(() => ModeloEntity, (modelo) => modelo.productos)
  modelo: ModeloEntity;

  @ManyToOne(() => CategoriaEntity, (categoria) => categoria.productos)
  categoria: CategoriaEntity;
}
