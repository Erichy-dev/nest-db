import {
  Entity,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  OneToOne,
  JoinTable, Column,
} from 'typeorm';
import { VehiculoEntity } from './vehiculo.entity';
import { UsuarioEntity } from './usuario.entity';
import { BaseEntity } from './BaseEntity';
import { CotizacionEntity } from './cotizacion.entity';
import { OrdenTrabajoProductoEntity } from './ordenTrabajoProducto.entity';
import { OrdenTrabajoDetalleEntity } from './ordenTrabajoDetalle.entity';

@Entity('orden_trabajo')
export class OrdenTrabajoEntity extends BaseEntity {
  @Column()
  neto: number;

  @Column()
  iva: number;

  @Column()
  total: number;

  @ManyToOne(() => VehiculoEntity, (vehiculo) => vehiculo.ordenesTrabajo)
  @JoinColumn()
  vehiculo: VehiculoEntity;

  @ManyToMany(() => UsuarioEntity, (usuario) => usuario.ordenesTrabajo)
  @JoinTable()
  usuarios: UsuarioEntity[];

  @OneToMany(() => CotizacionEntity, (cotizacion) => cotizacion.ordenTrabajo, {
    nullable: true,
  })
  cotizaciones: CotizacionEntity[];

  @OneToMany(
    () => OrdenTrabajoProductoEntity,
    (ordenTrabajoProducto) => ordenTrabajoProducto.ordenTrabajo,
  )
  ordenesTrabajoProductos: OrdenTrabajoProductoEntity[];

  @OneToMany(() => OrdenTrabajoDetalleEntity, (detalle) => detalle.ordenTrabajo)
  detalles: OrdenTrabajoDetalleEntity[];
}
