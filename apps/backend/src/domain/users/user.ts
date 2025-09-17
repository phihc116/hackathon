import { User as PrismaUser } from '@prisma/client';
import { Entity } from '../../core/domain';
import { ObjectId } from 'bson';
export class User extends Entity<PrismaUser> {
  constructor(
    public override readonly id: string,
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
 
  changeEmail(newEmail: string) {
    if (!newEmail.includes('@')) {
      throw new Error('Invalid email address');
    }
    this.email = newEmail;
    this.touchUpdatedAt();
  }

  setPassword(hashedPassword: string) {
    this.password = hashedPassword;
    this.touchUpdatedAt();
  }
}
