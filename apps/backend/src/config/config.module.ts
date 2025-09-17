import { Module } from "@nestjs/common";
import { JwtServiceConfig } from "./auth/jwt-service.config";
import mongoConfig, { DatabaseConfigValidation } from "./db/mongo-config";
import jwtConfig, { JwtConfigValidation } from "./auth/jwt.config";
import { configProvider } from ".";
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { validateConfigs } from "./helpers/validationHelper";

const withValidationSchemas: (new () => object)[] = [
  DatabaseConfigValidation,
  JwtConfigValidation,
];


@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [mongoConfig, jwtConfig],
      cache: true,
      validate: validateConfigs(withValidationSchemas),
    }),
  ],
  controllers: [],
  providers: [
    JwtServiceConfig,
    ...configProvider,
  ],
  exports: [
    JwtServiceConfig
  ],
})
export class ConfigModule {}
