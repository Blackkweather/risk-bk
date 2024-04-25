import { Module } from '@nestjs/common';
import { RiskResolutionService } from './risk-resolution.service';
import { RiskResolutionController } from './risk-resolution.controller';
import { RiskModule } from '../risk/risk.module';

@Module({
  controllers: [RiskResolutionController],
  providers: [RiskResolutionService],
})
export class RiskResolutionModule {}
