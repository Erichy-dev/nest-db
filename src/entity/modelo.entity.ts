import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { VehiculoEntity } from './vehiculo.entity';
import { MarcaEntity } from './marca.entity';
import { BaseEntity } from './BaseEntity';
import { ProductoEntity } from './producto.entity';
import { CotizacionEntity } from './cotizacion.entity';

@Entity('modelo')
export class ModeloEntity extends BaseEntity {
  @Column()
  nombre: string;

  @Column({
    nullable: true,
  })
  year: number;

  @OneToMany(() => VehiculoEntity, (vehiculo) => vehiculo.modelo)
  vehiculos: VehiculoEntity[];

  @OneToMany(() => ProductoEntity, (producto) => producto.modelo)
  productos: ProductoEntity[];

  @ManyToOne(() => MarcaEntity, (marca) => marca.modelos)
  marca: MarcaEntity;

  @OneToMany(() => CotizacionEntity, (cotizacion) => cotizacion.modelo, {
    nullable: true,
  })
  cotizaciones: CotizacionEntity;
}
