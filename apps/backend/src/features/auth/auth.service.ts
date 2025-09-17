import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { IUserRepository } from '../../infrastructure';
import { LoginCommand } from './models/login.command';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService, 
  ) {}

  async register(dto: RegisterDto): Promise<string> {
    const existing = await this.userRepository.getUserByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.createUser({
      email: dto.email,
      password: hashedPassword,
    });

    return user.id;
  }

  async login(command: LoginCommand): Promise<{ access_token: string }> {
    const payload = { sub: command.userId, email: command.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}