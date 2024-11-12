import { ClienteEntity } from '../entity';
import { Vehiculo } from './vehiculo';
import { BaseEntity } from './baseEntity';

export class Cliente extends BaseEntity {
  nombre: string;
  apellido: string;
  rut: string;
  email: string;
  celular: string;
  vehiculos: Vehiculo[];

  constructor(entity: ClienteEntity) {
    super(entity.id, entity.createdAt, entity.updatedAt, entity.active);
    this.nombre = entity.nombre;
    this.apellido = entity.apellido;
    this.rut = entity.rut;
    this.email = entity.email;
    this.celular = entity.celular;
    this.vehiculos = entity.vehiculos
      ? entity.vehiculos.map((vehiculo) => new Vehiculo(vehiculo))
      : [];
  }

  static fromEntity(entity: ClienteEntity): Cliente {
    return new Cliente(entity);
  }
}
