import { Module } from '@nestjs/common';
import { DomaineService } from './domaine.service';
import { DomaineController } from './domaine.controller';

@Module({
  controllers: [DomaineController],
  providers: [DomaineService],
})
export class DomaineModule {}
