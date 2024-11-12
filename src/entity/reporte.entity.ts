import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('reporte')
export class ReporteEntity extends BaseEntity {
  @Column()
  fecha: Date;
}
