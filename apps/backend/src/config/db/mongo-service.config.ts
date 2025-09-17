import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongoServiceConfig {
  constructor(private readonly configService: ConfigService) {}

  get url(): string {
    return this.configService.get<string>(
      'MONGO_URL',
      'mongodb://localhost:27017/defaultdb',
    );
  }
}
