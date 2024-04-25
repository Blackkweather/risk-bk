import { Module } from '@nestjs/common';
import { PerformanceIndicatorService } from './performance-indicator.service';
import { PerformanceIndicatorController } from './performance-indicator.controller';

@Module({
  controllers: [PerformanceIndicatorController],
  providers: [PerformanceIndicatorService],
})
export class PerformanceIndicatorModule {}
