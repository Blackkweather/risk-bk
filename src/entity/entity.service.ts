import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class EntityService {
  constructor(private prisma: PrismaService) {}
  async create(createEntityDto: CreateEntityDto) {
    try {
      return await this.prisma.entity.create({
        data: {
          name: createEntityDto.name,
          project: { connect: { id: createEntityDto.projectId } },
          parent: createEntityDto.parentId
            ? {
                connect: { id: createEntityDto.parentId },
              }
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
      return await this.prisma.entity.findMany({
        include: {
          parent: true,
          children: true,
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
      return await this.prisma.entity.findMany({
        where: {
          projectId: id,
        },
        include: {
          project: true,
          risks: true,
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
      return await this.prisma.entity.findUnique({
        include: {
          project: true,
          parent: true,
          children: true,
          risks: true,
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

  async update(id: number, updateEntityDto: UpdateEntityDto) {
    try {
      return await this.prisma.entity.update({
        where: {
          id: id,
        },
        data: {
          name: updateEntityDto.name,
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
      return await this.prisma.entity.delete({
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
