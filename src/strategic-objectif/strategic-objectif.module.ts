import { Module } from '@nestjs/common';
import { StrategicObjectifService } from './strategic-objectif.service';
import { StrategicObjectifController } from './strategic-objectif.controller';

@Module({
  controllers: [StrategicObjectifController],
  providers: [StrategicObjectifService],
})
export class StrategicObjectifModule {}
