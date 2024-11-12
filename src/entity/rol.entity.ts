import { Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { UsuarioEntity } from './usuario.entity';
import { PermisoEntity } from './permiso.entity';

@Entity('rol')
export class RolEntity extends BaseEntity {
  @ManyToMany(() => PermisoEntity, (permiso) => permiso.roles)
  @JoinTable()
  permisos: PermisoEntity[];

  @ManyToMany(() => UsuarioEntity, (usuario) => usuario.roles)
  usuarios: UsuarioEntity[];
}
