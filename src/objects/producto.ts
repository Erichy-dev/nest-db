import { ProductoEntity } from '../entity';
import { Modelo } from './modelo';
import { Categoria } from './categoria';
import { OrdenTrabajoProducto } from './ordenTrabajoProducto';
import { CompraDetalle } from './compraDetalle';
import { BaseEntity } from './baseEntity';

export class Producto extends BaseEntity {
  nombre: string;
  modelo: Modelo;
  categoria: Categoria;
  ordenesTrabajoProductos: OrdenTrabajoProducto[];
  comprasDetalles: CompraDetalle[];

  constructor(entity: ProductoEntity) {
    super(entity.id, entity.createdAt, entity.updatedAt, entity.active);
    this.nombre = entity.nombre;
    this.modelo = Modelo.fromEntity(entity.modelo);
    this.categoria = Categoria.fromEntity(entity.categoria);
    this.ordenesTrabajoProductos = entity.ordenesTrabajoProductos
      ? entity.ordenesTrabajoProductos.map(
          (otp) => new OrdenTrabajoProducto(otp),
        )
      : [];
    this.comprasDetalles = entity.comprasDetalles
      ? entity.comprasDetalles.map((cd) => new CompraDetalle(cd))
      : [];
  }

  static fromEntity(entity: ProductoEntity): Producto {
    return new Producto(entity);
  }
}
