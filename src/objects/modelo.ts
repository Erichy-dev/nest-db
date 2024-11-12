import { ModeloEntity } from '../entity';
import { Vehiculo } from './vehiculo';
import { Producto } from './producto';
import { Marca } from './marca';
import { BaseEntity } from './baseEntity';
import { Cotizacion } from './cotizacion';

export class Modelo extends BaseEntity {
  nombre: string;
  year: number;
  vehiculos: Vehiculo[];
  productos: Producto[];
  marca: Marca;
  cotizaciones: Cotizacion;

  constructor(entity: ModeloEntity) {
    super(entity.id, entity.createdAt, entity.updatedAt, entity.active);
    this.nombre = entity.nombre;
    this.year = entity.year;
    this.vehiculos = entity.vehiculos
      ? entity.vehiculos.map((vehiculo) => new Vehiculo(vehiculo))
      : [];
    this.productos = entity.productos
      ? entity.productos.map((producto) => new Producto(producto))
      : [];
    this.marca = Marca.fromEntity(entity.marca);
    this.cotizaciones = Cotizacion.fromEntity(entity.cotizaciones);
  }

  static fromEntity(entity: ModeloEntity): Modelo {
    return new Modelo(entity);
  }
}
