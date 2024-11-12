import { VehiculoEntity } from '../entity';
import { Cliente } from './cliente';
import { Modelo } from './modelo';
import { OrdenTrabajo } from './ordenTrabajo';
import { BaseEntity } from './baseEntity';

export class Vehiculo extends BaseEntity {
  patente: string;
  vin: string;
  cliente: Cliente;
  modelo: Modelo;
  ordenesTrabajo: OrdenTrabajo[];

  constructor(entity: VehiculoEntity) {
    super(entity.id, entity.createdAt, entity.updatedAt, entity.active);
    this.patente = entity.patente;
    this.vin = entity.vin;
    this.cliente = Cliente.fromEntity(entity.cliente);
    this.modelo = Modelo.fromEntity(entity.modelo);
    this.ordenesTrabajo = entity.ordenesTrabajo
      ? entity.ordenesTrabajo.map((orden) => new OrdenTrabajo(orden))
      : [];
  }

  static fromEntity(entity: VehiculoEntity): Vehiculo {
    return new Vehiculo(entity);
  }
}
