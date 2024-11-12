import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { ProductoEntity } from './producto.entity';

@Entity('categoria')
export class CategoriaEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
    comment: 'Nombre categoria',
  })
  nombre: string;

  @OneToMany(() => ProductoEntity, (producto) => producto.categoria)
  productos: ProductoEntity[];
}
