import { MarcaEntity } from '../entity';
import { Modelo } from './modelo';
import { BaseEntity } from './baseEntity';

export class Marca extends BaseEntity {
  nombre: string;
  modelos: Modelo[];

  constructor(entity: MarcaEntity) {
    super(entity.id, entity.createdAt, entity.updatedAt, entity.active);
    this.nombre = entity.nombre;
    this.modelos = entity.modelos
      ? entity.modelos.map((modelo) => new Modelo(modelo))
      : [];
  }

  static fromEntity(entity: MarcaEntity): Marca {
    return new Marca(entity);
  }
}
