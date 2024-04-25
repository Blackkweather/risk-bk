import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class RiskService {
  constructor(private prisma: PrismaService) {}

  impact_converter(impact: number) {
    if (impact === 0) {
      return 5;
    }
    if (impact === 1) {
      return 15;
    }
    if (impact === 2) {
      return 35;
    }
    if (impact === 3) {
      return 70;
    }
    if (impact === 4) {
      return 125;
    }
    if (impact === 5) {
      return 200;
    }
    return 0;
  }

  frequency_converter(frequency: number) {
    if (frequency === 0) {
      return 1;
    }
    if (frequency === 1) {
      return 2;
    }
    if (frequency === 2) {
      return 3;
    }
    if (frequency === 3) {
      return 4;
    }
    if (frequency === 4) {
      return 5;
    }
    if (frequency === 5) {
      return 6;
    }
    return 0;
  }
  calcEval(dto: CreateRiskDto | UpdateRiskDto) {
    const value =
      this.impact_converter(dto.peopleImpact) +
      this.impact_converter(dto.reputationImpact) +
      this.impact_converter(dto.activityImpact) +
      this.impact_converter(dto.legalImpact) +
      this.impact_converter(dto.financialImpact);
    const finalValue = value * this.frequency_converter(dto.frequency);
    return finalValue;
  }
  async create(createRiskDto: CreateRiskDto) {
    try {
      const evaluation = this.calcEval(createRiskDto);

      return await this.prisma.risk.create({
        data: {
          name: createRiskDto.name,
          description: createRiskDto.description,
          details: createRiskDto.details,
          cause: createRiskDto.cause,
          frequency: createRiskDto.frequency,
          financialImpact: createRiskDto.financialImpact,
          legalImpact: createRiskDto.legalImpact,
          activityImpact: createRiskDto.activityImpact,
          peopleImpact: createRiskDto.peopleImpact,
          reputationImpact: createRiskDto.reputationImpact,
          existantDb: createRiskDto.existantDb,
          active: createRiskDto.active,
          brutCriticality: 6000,
          evaluation: evaluation,
          netCriticality: 6000 - evaluation,
          activity: { connect: { id: createRiskDto.activityId } },
          entity: { connect: { id: createRiskDto.entityId } },
          strategicObjective: createRiskDto.strategicObjectiveId
            ? { connect: { id: createRiskDto.strategicObjectiveId } }
            : {},
          operationalObjective: createRiskDto.operationalObjectiveId
            ? { connect: { id: createRiskDto.operationalObjectiveId } }
            : {},
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  }

  async findAll() {
    try {
      return await this.prisma.risk.findMany({
        include: {
          activity: true,
          operationalObjective: true,
          strategicObjective: true,
          riskFamily: true,
          entity: true,
          controls: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  }

  async getByProject(id) {
    try {
      return await this.prisma.risk.findMany({
        where: {
          entity: {
            projectId: id,
          },
        },
        include: {
          activity: true,
          controls: true,
          entity: true,
          riskFamily: true,
          operationalObjective: true,
          strategicObjective: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  }

  // going to change cuz it needs to also include those of children
  async getByEntity(id) {
    try {
      return await this.prisma.risk.findMany({
        where: {
          entityId: id,
        },
        include: {
          activity: true,
          controls: true,
          entity: true,
          riskFamily: true,
          operationalObjective: true,
          strategicObjective: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  }

  // going to change cuz it needs to also include those of children (this one might not need the change since it returns based on activities who all have the process id)
  async getByProcess(id) {
    try {
      return await this.prisma.risk.findMany({
        where: {
          activity: {
            processId: id,
          },
        },
        include: {
          activity: true,
          controls: true,
          entity: true,
          riskFamily: true,
          operationalObjective: true,
          strategicObjective: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  }

  // going to change cuz it needs to also include those of children
  async getByActivity(id) {
    try {
      return await this.prisma.risk.findMany({
        where: {
          activityId: id,
        },
        include: {
          activity: true,
          controls: true,
          entity: true,
          riskFamily: true,
          operationalObjective: true,
          strategicObjective: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.risk.findUnique({
        include: {
          activity: true,
          controls: true,
          entity: true,
          riskFamily: true,
          strategicObjective: true,
          operationalObjective: true,
        },
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  }

  async update(id: number, updateRiskDto: UpdateRiskDto) {
    try {
      const evaluation = this.calcEval(updateRiskDto);
      return await this.prisma.risk.update({
        where: {
          id: id,
        },
        data: {
          name: updateRiskDto.name,
          description: updateRiskDto.description,
          details: updateRiskDto.details,
          cause: updateRiskDto.cause,
          frequency: updateRiskDto.frequency,
          existantDb: updateRiskDto.existantDb,
          financialImpact: updateRiskDto.financialImpact,
          legalImpact: updateRiskDto.legalImpact,
          reputationImpact: updateRiskDto.reputationImpact,
          activityImpact: updateRiskDto.activityImpact,
          peopleImpact: updateRiskDto.peopleImpact,
          active: updateRiskDto.active,
          evaluation: evaluation,
          netCriticality: 6000 - evaluation,
          riskFamily: updateRiskDto.riskFamilyId
            ? { connect: { id: updateRiskDto.riskFamilyId } }
            : {},
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.risk.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  }
}
