import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProcessService {
  constructor(private prisma: PrismaService) {}

  async create(createProcessDto: CreateProcessDto) {
    try {
      return await this.prisma.process.create({
        data: {
          name: createProcessDto.name,
          description: createProcessDto.description,
          domaine: { connect: { id: createProcessDto.domaineId } },
          parent: createProcessDto.parentId
            ? { connect: { id: createProcessDto.parentId } }
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
      return await this.prisma.process.findMany({
        include: {
          activities: true,
          parent: true,
          children: true,
          domaine: true,
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
      return await this.prisma.process.findMany({
        where: {
          domaine: {
            projectId: id,
          },
        },
        include: {
          activities: true,
          domaine: true,
          parent: true,
          children: true,
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
      return await this.prisma.process.findUnique({
        include: {
          activities: true,
          domaine: true,
          children: true,
          parent: true,
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

  async update(id: number, updateProcessDto: UpdateProcessDto) {
    try {
      const process = await this.prisma.process.update({
        where: {
          id: id,
        },
        data: {
          name: updateProcessDto.name,
          description: updateProcessDto.description,
        },
      });
      return process;
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
      return await this.prisma.process.delete({
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
