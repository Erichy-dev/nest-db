import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  updatedAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  createdAt: Date;

  @Column({
    default: true,
  })
  active: boolean;
}
