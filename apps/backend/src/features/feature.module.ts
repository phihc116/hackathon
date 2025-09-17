import { Module } from '@nestjs/common'; 
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
@Module({
  imports: [InfrastructureModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class FeatureModule {}
