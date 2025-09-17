 
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { LocalStrategy } from "./auth/local.strategy";
import { JwtStrategy } from "./auth/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "../config/config.module";
import { JwtServiceConfig } from "../config";
import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { ClsModule } from "nestjs-cls";
import { AuthenticatedRequest } from "./auth/types";
import { CoreModule } from "../core/core.module"; 
import { IUserRepository } from "./persistence/users/user.repository.interface";
import { UserRepository } from "./persistence/users/user.repository";
import { AuthService } from "./auth/auth.service";
import { IdentityService } from "./auth/identity.service";
import { PrismaService } from "../core/infrastructure";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (jwtServiceConfig: JwtServiceConfig) => ({
        secret: jwtServiceConfig.secret,
        signOptions: {
          expiresIn: jwtServiceConfig.accessTtl,
        },
        verifyOptions: {
          clockTolerance: jwtServiceConfig.clockSkew,
        },
      }),
      inject: [JwtServiceConfig],
    }),
    ClsModule.forRoot({
      global: true,
      interceptor: {
        mount: true,
        setup(cls, context) {
          const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
          cls.set('USER_ID', req.user?.userId);
          cls.set('EMAIL', req.user?.email);
        },
      },
    }),
    CoreModule,
    ConfigModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
        provide: IUserRepository,
        useClass: UserRepository,
    },    
    LocalStrategy,
    JwtStrategy,
    PrismaService,
    AuthService,
    IdentityService
  ],
  exports: [
    JwtModule,
    {
        provide: IUserRepository,
        useClass: UserRepository,
    },
    AuthService,
    PrismaService,
    IdentityService,
    ClsModule,
  ]
})
export class InfrastructureModule {}
