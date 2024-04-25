import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePerformanceIndicatorDto } from './dto/create-performance-indicator.dto';
import { UpdatePerformanceIndicatorDto } from './dto/update-performance-indicator.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PerformanceIndicatorService {
  constructor(private prisma: PrismaService) {}
  async create(createPerformanceIndicatorDto: CreatePerformanceIndicatorDto) {
    try {
      return await this.prisma.performanceIndicator.create({
        data: {
          name: createPerformanceIndicatorDto.name,
          description: createPerformanceIndicatorDto.description,
          currentValue: createPerformanceIndicatorDto.currentValue,
          targetValue: createPerformanceIndicatorDto.targetValue,
          project: { connect: { id: createPerformanceIndicatorDto.projectId } },
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
      return await this.prisma.performanceIndicator.findMany({
        include: {
          project: true,
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

  async getByProject(id: number) {
    try {
      return await this.prisma.performanceIndicator.findMany({
        where: {
          projectId: id,
        },
        include: {
          project: true,
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
      return await this.prisma.performanceIndicator.findUnique({
        where: {
          id: id,
        },
        include: {
          project: true,
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

  async update(
    id: number,
    updatePerformanceIndicatorDto: UpdatePerformanceIndicatorDto,
  ) {
    try {
      return await this.prisma.performanceIndicator.update({
        where: {
          id: id,
        },
        data: {
          name: updatePerformanceIndicatorDto.name,
          description: updatePerformanceIndicatorDto.description,
          currentValue: updatePerformanceIndicatorDto.currentValue,
          targetValue: updatePerformanceIndicatorDto.targetValue,
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
      return await this.prisma.performanceIndicator.delete({
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
