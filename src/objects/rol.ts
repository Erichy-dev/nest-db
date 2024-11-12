import { RolEntity } from '../entity';
import { Permiso } from './permiso';
import { Usuario } from './usuario';
import { BaseEntity } from './baseEntity';

export class Rol extends BaseEntity {
  permisos: Permiso[];
  usuarios: Usuario[];

  constructor(entity: RolEntity) {
    super(entity.id, entity.createdAt, entity.updatedAt, entity.active);
    this.permisos = entity.permisos
      ? entity.permisos.map((permiso) => new Permiso(permiso))
      : [];
    this.usuarios = entity.usuarios
      ? entity.usuarios.map((usuario) => new Usuario(usuario))
      : [];
  }

  static fromEntity(entity: RolEntity): Rol {
    return new Rol(entity);
  }
}
