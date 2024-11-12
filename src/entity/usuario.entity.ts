import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { OrdenTrabajoEntity } from './ordenTrabajo.entity';
import { RolEntity } from './rol.entity';

@Entity('usuario')
export class UsuarioEntity extends BaseEntity {
  @Column()
  nombre: string;

  @Column({ nullable: true })
  apellido: string;

  @Column({ nullable: true })
  rut: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  celular: string;

  @Column()
  password: string;

  @ManyToMany(() => OrdenTrabajoEntity, (ordenTrabajo) => ordenTrabajo.usuarios)
  @JoinTable()
  ordenesTrabajo: OrdenTrabajoEntity[];

  @ManyToMany(() => RolEntity, (rol) => rol.usuarios)
  @JoinTable()
  roles: RolEntity[];
}
