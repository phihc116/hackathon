import { IUserRepository } from './user.repository.interface';
import { UserCreateInput } from './models/user-create-input';
import { Injectable } from '@nestjs/common';
import { PrismaRepository, PrismaService } from '../../../core/infrastructure';
import { User as PrismaUser } from '@prisma/client';
import { User } from '../../../domain';
import { Identity } from '../../../core/domain/identity';

@Injectable()
export class UserRepository extends PrismaRepository<
  User,
  PrismaUser,
  Identity
> implements IUserRepository {
  
  constructor(
    private readonly prismaService: PrismaService
  ) {
    super(prismaService.user);
  }
  protected override fromPrisma(prismaModel: { name: string | null; id: string; email: string; password: string; createdAt: Date; updatedAt: Date; }): User {
    return new User(
      prismaModel.id,
      prismaModel.email,
      prismaModel.name,
      prismaModel.password,
      prismaModel.createdAt,
      prismaModel.updatedAt
    )
  }
  async createUser(userCreateInput: UserCreateInput): Promise<User> {
    const userDomain = User.create(userCreateInput.email, userCreateInput.password)
    return this.create(userDomain);
  }
  async getUserByEmail(email: string): Promise<User | null> { 
    const userPrisma = await this.prismaService.user.findUnique({
      where: { email: email },
    }); 

    if(!userPrisma) return null;
    return this.fromPrisma(userPrisma);
  }
}
