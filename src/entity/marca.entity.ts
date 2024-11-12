import { Column, Entity, OneToMany } from 'typeorm';
import { ModeloEntity } from './modelo.entity';
import { BaseEntity } from './BaseEntity';

@Entity('marca')
export class MarcaEntity extends BaseEntity {
  @Column()
  nombre: string;

  @OneToMany(() => ModeloEntity, (modelo) => modelo.marca)
  modelos: ModeloEntity[];
}
