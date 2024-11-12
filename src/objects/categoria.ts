import { CategoriaEntity } from '../entity';
import { Producto } from './producto';
import { BaseEntity } from './baseEntity';

export class Categoria extends BaseEntity {
  nombre: string;
  productos: Producto[];

  constructor(entity: CategoriaEntity) {
    super(entity.id, entity.createdAt, entity.updatedAt, entity.active);
    this.nombre = entity.nombre;
    this.productos = entity.productos
      ? entity.productos.map((prod) => new Producto(prod))
      : [];
  }

  static fromEntity(entity: CategoriaEntity): Categoria {
    return new Categoria(entity);
  }
}
