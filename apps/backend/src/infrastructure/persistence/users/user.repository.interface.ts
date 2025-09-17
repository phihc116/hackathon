import { Identity } from '../../../core/domain/identity';
import { IRepository } from '../../../core/infrastructure';
import { User } from '../../../domain';
import { UserCreateInput } from './models/user-create-input';

export interface IUserRepository extends IRepository<User, Identity>{
  getUserByEmail(email: string): Promise<User | null>;
  createUser(userCreateInput: UserCreateInput): Promise<User>;
}

export const IUserRepository = Symbol('IUserRepository');
