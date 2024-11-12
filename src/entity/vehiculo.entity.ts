import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { ModeloEntity } from './modelo.entity';
import { ClienteEntity } from './cliente.entity';
import { OrdenTrabajoEntity } from './ordenTrabajo.entity';
import { BaseEntity } from './BaseEntity';

@Entity('vehiculo')
export class VehiculoEntity extends BaseEntity {
  @Column()
  patente: string;

  @Column({ nullable: true })
  vin: string;

  @ManyToOne(() => ClienteEntity, (usuario) => usuario.vehiculos)
  cliente: ClienteEntity;

  @ManyToOne(() => ModeloEntity, (modelo) => modelo.vehiculos)
  modelo: ModeloEntity;

  @OneToMany(() => OrdenTrabajoEntity, (ordenTrabajo) => ordenTrabajo.vehiculo)
  ordenesTrabajo: OrdenTrabajoEntity[];
}
