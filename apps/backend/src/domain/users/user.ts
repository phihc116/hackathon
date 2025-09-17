import { Entity } from '../../core/domain';
import { ObjectId } from 'bson';
import { Identity } from '../../core/domain';
export class User extends Entity<Identity> {
  constructor(
    public override readonly id: Identity,
    public email: string,
    public name: string | null,
    public password: string,
    public override readonly createdAt: Date,
    public override updatedAt: Date
  ) {
    super(id, createdAt, updatedAt);
  }
 
  static create(email: string, hashedPassword: string, name?: string | null): User {
    const now = new Date();
    return new User(
      new ObjectId().toHexString(),  
      email,
      name ?? null,
      hashedPassword,
      now,
      now
    );
  } 
}
