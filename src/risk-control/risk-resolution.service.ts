import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRiskControlDto } from './dto/create-risk-control.dto';
import { UpdateRiskControlDto } from './dto/update-risk-control.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class RiskResolutionService {
  constructor(private prisma: PrismaService) {}
  async create(createRiskControlDto: CreateRiskControlDto) {
    try {
      return await this.prisma.riskControl.create({
        include: {
          risk: true,
        },
        data: {
          name: createRiskControlDto.name,
          meanIndicator: createRiskControlDto.meanIndicator,
          meanIntegrated: createRiskControlDto.meanIntegrated,
          meanManualPost: createRiskControlDto.meanManualPost,
          meanManualPre: createRiskControlDto.meanManualPre,
          meanOrganization: createRiskControlDto.meanOrganization,
          meanReference: createRiskControlDto.meanReference,
          meanProgrammed: createRiskControlDto.meanProgrammed,
          evaluation: createRiskControlDto.evaluation,
          proposedControl: createRiskControlDto.proposedControl,
          proposedControlDescription:
            createRiskControlDto.proposedControlDescription,
          risk: { connect: { id: createRiskControlDto.riskId } },
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
      return await this.prisma.riskControl.findMany({
        include: {
          risk: true,
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
      return await this.prisma.riskControl.findUnique({
        include: {
          risk: true,
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

  async update(id: number, updateRiskResolutionDto: UpdateRiskControlDto) {
    try {
      return await this.prisma.riskControl.update({
        where: {
          id: id,
        },
        data: {
          name: updateRiskResolutionDto.name,
          meanIndicator: updateRiskResolutionDto.meanIndicator,
          meanIntegrated: updateRiskResolutionDto.meanIntegrated,
          meanManualPost: updateRiskResolutionDto.meanManualPost,
          meanManualPre: updateRiskResolutionDto.meanManualPre,
          meanOrganization: updateRiskResolutionDto.meanOrganization,
          meanReference: updateRiskResolutionDto.meanReference,
          meanProgrammed: updateRiskResolutionDto.meanProgrammed,
          evaluation: updateRiskResolutionDto.evaluation,
          proposedControl: updateRiskResolutionDto.proposedControl,
          proposedControlDescription:
            updateRiskResolutionDto.proposedControlDescription,
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
      return await this.prisma.riskControl.delete({
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
