import { Identity } from "./identity";

export abstract class Entity<TPrisma = null> {
  constructor(
    public readonly id: Identity,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}
 
  
  touchUpdatedAt() {
    this.updatedAt = new Date();
  }
 
  equals(entity?: Entity<TPrisma>): boolean {
    if (!entity) return false;
    return this.id === entity.id;
  }
}