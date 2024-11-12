import { UsuarioEntity } from '../entity';
import { OrdenTrabajo } from './ordenTrabajo';
import { Rol } from './rol';
import { BaseEntity } from './baseEntity';

export class Usuario extends BaseEntity {
  nombre: string;
  apellido: string;
  rut: string;
  email: string;
  celular: string;
  password: string;
  ordenesTrabajo: OrdenTrabajo[];
  roles: Rol[];

  constructor(entity: UsuarioEntity) {
    super(entity.id, entity.createdAt, entity.updatedAt, entity.active);
    this.nombre = entity.nombre;
    this.apellido = entity.apellido;
    this.rut = entity.rut;
    this.email = entity.email;
    this.celular = entity.celular;
    this.password = entity.password;
    this.ordenesTrabajo = entity.ordenesTrabajo
      ? entity.ordenesTrabajo.map((orden) => new OrdenTrabajo(orden))
      : [];
    this.roles = entity.roles ? entity.roles.map((rol) => new Rol(rol)) : [];
  }

  static fromEntity(entity: UsuarioEntity): Usuario {
    return new Usuario(entity);
  }
}
