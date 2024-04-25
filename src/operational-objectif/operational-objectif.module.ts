import { Module } from '@nestjs/common';
import { OperationalObjectifService } from './operational-objectif.service';
import { OperationalObjectifController } from './operational-objectif.controller';

@Module({
  controllers: [OperationalObjectifController],
  providers: [OperationalObjectifService],
})
export class OperationalObjectifModule {}
