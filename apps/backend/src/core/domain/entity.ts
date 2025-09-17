export abstract class Entity<TId = null> {
  constructor(
    public readonly id: TId,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}
 
  
  touchUpdatedAt() {
    this.updatedAt = new Date();
  } 
}