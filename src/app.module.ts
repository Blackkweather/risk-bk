import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RoleModule } from './role/role.module';
import { ClientModule } from './client/client.module';
import { ProjectModule } from './project/project.module';
import { EntityModule } from './entity/entity.module';
import { ProcessModule } from './process/process.module';
import { StatusModule } from './status/status.module';
import { ActivityModule } from './activity/activity.module';
import { OperationalObjectifModule } from './operational-objectif/operational-objectif.module';
import { StrategicObjectifModule } from './strategic-objectif/strategic-objectif.module';
import { PerformanceIndicatorModule } from './performance-indicator/performance-indicator.module';
import { RiskModule } from './risk/risk.module';
import { RiskResolutionModule } from './risk-control/risk-resolution.module';
import { DomaineModule } from './domaine/domaine.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RoleModule,
    ClientModule,
    ProjectModule,
    EntityModule,
    ProcessModule,
    StatusModule,
    ActivityModule,
    OperationalObjectifModule,
    StrategicObjectifModule,
    PerformanceIndicatorModule,
    RiskModule,
    RiskResolutionModule,
    DomaineModule,
    HealthModule,
  ],
})
export class AppModule {}
