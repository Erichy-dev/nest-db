import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { CompraEntity } from './compra.entity';
import { ProductoEntity } from './producto.entity';

@Entity('compra_detalle')
export class CompraDetalleEntity extends BaseEntity {
  @Column({
    type: 'int',
  })
  cantidad: number;

  @Column({
    type: 'int',
  })
  precio: number;

  @ManyToOne(() => CompraEntity, (compra) => compra.detalles)
  compra: CompraEntity;

  @ManyToOne(() => ProductoEntity, (producto) => producto.comprasDetalles)
  producto: ProductoEntity;
}
