import { Column, Entity, OneToMany } from 'typeorm';
import { VehiculoEntity } from './vehiculo.entity';
import { BaseEntity } from './BaseEntity';

@Entity('cliente')
export class ClienteEntity extends BaseEntity {
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

  @OneToMany(() => VehiculoEntity, (vehiculo) => vehiculo.cliente)
  vehiculos: VehiculoEntity[];
}
