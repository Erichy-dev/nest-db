import { BaseEntity } from './baseEntity';
import { Trabajo } from './trabajo';
import { ActividadEntity } from '../entity/actividad.entity';

export class Actividad extends BaseEntity {
  nombre: string;
  costo: number;
  trabajos: Trabajo[];

  constructor(entity: ActividadEntity) {
    super(entity.id, entity.createdAt, entity.updatedAt, entity.active);
    this.nombre = entity.nombre;
    this.costo = entity.costo;
    this.trabajos = entity.trabajos
      ? entity.trabajos.map((trabajo) => new Trabajo(trabajo))
      : [];
  }

  static fromEntity(entity: ActividadEntity): Actividad {
    return new Actividad(entity);
  }
}
