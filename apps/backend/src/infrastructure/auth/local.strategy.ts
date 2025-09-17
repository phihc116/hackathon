import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service'; 
import { IUserRepository } from '../persistence/users/user.repository.interface';
import { InfrastructureException } from '../../core/sharedkernel';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new InfrastructureException('Invalid credentials');
    }

    const isValid = await this.authService.verifyPassword(
      password,
      user.password,
    );
    if (!isValid) {
      throw new InfrastructureException('Invalid credentials');
    }

    return {
      userId: user.id,
      email: user.email,
    };
  }
}
