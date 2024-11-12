export class BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;

  constructor(id: number, createdAt: Date, updatedAt: Date, active: boolean) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.active = active;
  }
}
