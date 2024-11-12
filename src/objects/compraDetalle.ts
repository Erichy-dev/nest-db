import { CompraDetalleEntity } from '../entity';
import { Compra } from './compra';
import { Producto } from './producto';
import { BaseEntity } from './baseEntity';

export class CompraDetalle extends BaseEntity {
  cantidad: number;
  precio: number;
  compra: Compra;
  producto: Producto;

  constructor(entity: CompraDetalleEntity) {
    super(entity.id, entity.createdAt, entity.updatedAt, entity.active);
    this.cantidad = entity.cantidad;
    this.precio = entity.precio;
    this.compra = Compra.fromEntity(entity.compra);
    this.producto = Producto.fromEntity(entity.producto);
  }

  static fromEntity(entity: CompraDetalleEntity): CompraDetalle {
    return new CompraDetalle(entity);
  }
}
