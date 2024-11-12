import { OrdenTrabajoEntity } from '../entity';
import { Vehiculo } from './vehiculo';
import { Usuario } from './usuario';
import { Cotizacion } from './cotizacion';
import { OrdenTrabajoProducto } from './ordenTrabajoProducto';
import { OrdenTrabajoDetalle } from './ordenTrabajoDetalle';
import { BaseEntity } from './baseEntity';

export class OrdenTrabajo extends BaseEntity {
  vehiculo: Vehiculo;
  usuarios: Usuario[];
  cotizacion: Cotizacion[];
  ordenesTrabajoProductos: OrdenTrabajoProducto[];
  detalles: OrdenTrabajoDetalle[];

  constructor(entity: OrdenTrabajoEntity) {
    super(entity.id, entity.createdAt, entity.updatedAt, entity.active);
    this.vehiculo = Vehiculo.fromEntity(entity.vehiculo);
    this.usuarios = entity.usuarios
      ? entity.usuarios.map((usuario) => new Usuario(usuario))
      : [];
    this.cotizacion = entity.cotizaciones? entity.cotizaciones.map((cotizacion) => new Cotizacion(cotizacion)) : [];
    this.ordenesTrabajoProductos = entity.ordenesTrabajoProductos
      ? entity.ordenesTrabajoProductos.map(
          (otp) => new OrdenTrabajoProducto(otp),
        )
      : [];
    this.detalles = entity.detalles
      ? entity.detalles.map((detalle) => new OrdenTrabajoDetalle(detalle))
      : [];
  }

  static fromEntity(entity: OrdenTrabajoEntity): OrdenTrabajo {
    return new OrdenTrabajo(entity);
  }
}
