import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { RolEntity } from './rol.entity';

@Entity('permiso')
export class PermisoEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 60,
    comment: 'Nombre Permiso',
  })
  nombre: string;

  @ManyToMany(() => RolEntity, (rol) => rol.permisos)
  roles: RolEntity[];
}
