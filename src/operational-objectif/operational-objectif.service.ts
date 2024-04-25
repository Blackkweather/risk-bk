import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOperationalObjectifDto } from './dto/create-operational-objectif.dto';
import { UpdateOperationalObjectifDto } from './dto/update-operational-objectif.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class OperationalObjectifService {
  constructor(private prisma: PrismaService) {}
  async create(createOperationalObjectifDto: CreateOperationalObjectifDto) {
    try {
      return await this.prisma.operationalObjectif.create({
        data: {
          name: createOperationalObjectifDto.name,
          description: createOperationalObjectifDto.description,
          strategicObjective: {
            connect: { id: createOperationalObjectifDto.strategicObjectiveId },
          },
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
      return await this.prisma.operationalObjectif.findMany({
        include: {
          strategicObjective: true,
          risks: true,
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
      return await this.prisma.operationalObjectif.findMany({
        where: {
          strategicObjective: {
            projectId: id,
          },
        },
        include: {
          strategicObjective: true,
          risks: true,
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
      return await this.prisma.operationalObjectif.findUnique({
        where: {
          id: id,
        },
        include: {
          strategicObjective: true,
          risks: true,
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
    updateOperationalObjectifDto: UpdateOperationalObjectifDto,
  ) {
    try {
      return await this.prisma.operationalObjectif.update({
        where: {
          id: id,
        },
        data: {
          name: updateOperationalObjectifDto.name,
          description: updateOperationalObjectifDto.description,
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
      return await this.prisma.operationalObjectif.delete({
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
