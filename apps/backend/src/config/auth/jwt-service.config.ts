import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtServiceConfig {
  constructor(private readonly configService: ConfigService) {}

  get issuer(): string {
    return this.configService.get<string>('JWT_ISS', 'https://default-issuer');
  }

  get audience(): string {
    return this.configService.get<string>('JWT_AUD', 'https://default-aud');
  }

  get accessTtl(): string {
    return this.configService.get<string>('JWT_ACCESS_TTL', '15m');
  }

  get refreshTtl(): string {
    return this.configService.get<string>('JWT_REFRESH_TTL', '30d');
  }

  get clockSkew(): number {
    return this.configService.get<number>('JWT_CLOCK_SKEW', 60);
  }

  get secret(): string {
    return this.configService.get<string>(
      'JWT_SECRET',
      'superlongrandomsecret32bytes',
    );
  }
}
