import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { FeatureModule } from './features/feature.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [InfrastructureModule, FeatureModule, CoreModule], 
})
export class AppModule {}
