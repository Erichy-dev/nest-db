import { OrdenTrabajoProductoEntity } from '../entity';
import { OrdenTrabajo } from './ordenTrabajo';
import { Producto } from './producto';
import { BaseEntity } from './baseEntity';

export class OrdenTrabajoProducto extends BaseEntity {
  ordenTrabajo: OrdenTrabajo;
  producto: Producto;
  cantidad: number;

  constructor(entity: OrdenTrabajoProductoEntity) {
    super(entity.id, entity.createdAt, entity.updatedAt, entity.active);
    this.ordenTrabajo = OrdenTrabajo.fromEntity(entity.ordenTrabajo);
    this.producto = Producto.fromEntity(entity.producto);
    this.cantidad = entity.cantidad;
  }

  static fromEntity(entity: OrdenTrabajoProductoEntity): OrdenTrabajoProducto {
    return new OrdenTrabajoProducto(entity);
  }
}
