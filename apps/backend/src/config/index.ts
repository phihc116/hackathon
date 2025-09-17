import { Provider } from '@nestjs/common';
import { JwtServiceConfig } from './auth/jwt-service.config';
import { MongoServiceConfig } from './db/mongo-service.config';

export * from './auth/jwt-service.config';
export * from './db/mongo-service.config'; 
export * from './helpers/environment';

export const configProvider: Provider[] = [ 
  JwtServiceConfig,
  MongoServiceConfig,
];
