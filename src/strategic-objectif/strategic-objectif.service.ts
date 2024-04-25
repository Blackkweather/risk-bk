import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStrategicObjectifDto } from './dto/create-strategic-objectif.dto';
import { UpdateStrategicObjectifDto } from './dto/update-strategic-objectif.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class StrategicObjectifService {
  constructor(private prisma: PrismaService) {}
  async create(createStrategicObjectifDto: CreateStrategicObjectifDto) {
    try {
      return await this.prisma.strategicObjectif.create({
        data: {
          name: createStrategicObjectifDto.name,
          description: createStrategicObjectifDto.description,
          project: { connect: { id: createStrategicObjectifDto.projectId } },
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
      return await this.prisma.strategicObjectif.findMany();
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
      return await this.prisma.strategicObjectif.findMany({
        where: {
          projectId: id,
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
      return await this.prisma.strategicObjectif.findUnique({
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

  async update(
    id: number,
    updateStrategicObjectifDto: UpdateStrategicObjectifDto,
  ) {
    try {
      return await this.prisma.strategicObjectif.update({
        where: {
          id: id,
        },
        data: {
          name: updateStrategicObjectifDto.name,
          description: updateStrategicObjectifDto.description,
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
      return await this.prisma.strategicObjectif.delete({
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
