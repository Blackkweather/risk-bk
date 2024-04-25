import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  async create(createActivityDto: CreateActivityDto) {
    try {
      return await this.prisma.activity.create({
        data: {
          name: createActivityDto.name,
          description: createActivityDto.description,
          parent: createActivityDto.parentId
            ? { connect: { id: createActivityDto.parentId } }
            : {},
          process: { connect: { id: createActivityDto.processId } },
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
      return await this.prisma.activity.findMany({
        include: {
          parent: true,
          children: true,
          process: true,
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
      return await this.prisma.activity.findMany({
        where: {
          process: {
            domaine: {
              projectId: id,
            },
          },
        },
        include: {
          process: true,
          risks: true,
          children: true,
          parent: true,
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
      return await this.prisma.activity.findUnique({
        include: {
          process: true,
          risks: true,
          parent: true,
          children: true,
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

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    try {
      return await this.prisma.activity.update({
        where: {
          id: id,
        },
        data: {
          name: updateActivityDto.name,
          description: updateActivityDto.description,
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
      return await this.prisma.activity.delete({
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
