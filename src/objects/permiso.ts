import { PermisoEntity } from '../entity';
import { Rol } from './rol';
import { BaseEntity } from './baseEntity';

export class Permiso extends BaseEntity {
  nombre: string;
  roles: Rol[];

  constructor(entity: PermisoEntity) {
    super(entity.id, entity.createdAt, entity.updatedAt, entity.active);
    this.nombre = entity.nombre;
    this.roles = entity.roles ? entity.roles.map((rol) => new Rol(rol)) : [];
  }

  static fromEntity(entity: PermisoEntity): Permiso {
    return new Permiso(entity);
  }
}
