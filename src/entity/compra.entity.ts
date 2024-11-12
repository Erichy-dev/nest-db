import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { CompraDetalleEntity } from './compraDetalle.entity';

@Entity('compra')
export class CompraEntity extends BaseEntity {
  @Column({
    type: 'int',
  })
  total: number;

  @OneToMany(() => CompraDetalleEntity, (compraDetalle) => compraDetalle.compra)
  detalles: CompraDetalleEntity[];
}
