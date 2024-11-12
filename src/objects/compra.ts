import { CompraEntity } from '../entity';
import { CompraDetalle } from './compraDetalle';
import { BaseEntity } from './baseEntity';

export class Compra extends BaseEntity {
  total: number;
  detalles: CompraDetalle[];

  constructor(entity: CompraEntity) {
    super(entity.id, entity.createdAt, entity.updatedAt, entity.active);
    this.total = entity.total;
    this.detalles = entity.detalles
      ? entity.detalles.map((detalle) => new CompraDetalle(detalle))
      : [];
  }

  static fromEntity(entity: CompraEntity): Compra {
    return new Compra(entity);
  }
}
