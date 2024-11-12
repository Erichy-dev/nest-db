import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { TrabajoEntity } from './trabajo.entity';

@Entity('actividad')
export class ActividadEntity extends BaseEntity {
  @Column()
  nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  costo: number;

  @ManyToMany(() => TrabajoEntity, (trabajo) => trabajo.actividades)
  @JoinTable()
  trabajos: TrabajoEntity[];
}
