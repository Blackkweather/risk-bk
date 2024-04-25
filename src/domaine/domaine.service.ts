import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDomaineDto } from './dto/create-domaine.dto';
import { UpdateDomaineDto } from './dto/update-domaine.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class DomaineService {
  constructor(private prisma: PrismaService) {}

  async create(createDomaineDto: CreateDomaineDto) {
    try {
      return await this.prisma.domaine.create({
        data: {
          name: createDomaineDto.name,
          project: { connect: { id: createDomaineDto.projectId } },
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
      return await this.prisma.domaine.findMany({
        include: {
          project: true,
          processes: true,
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
      return await this.prisma.domaine.findMany({
        where: {
          projectId: id,
        },
        include: {
          project: true,
          processes: true,
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
      return await this.prisma.domaine.findUnique({
        where: {
          id: id,
        },
        include: {
          project: true,
          processes: true,
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

  async update(id: number, updateDomaineDto: UpdateDomaineDto) {
    try {
      return await this.prisma.domaine.update({
        where: {
          id: id,
        },
        data: {
          name: updateDomaineDto.name,
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
      return await this.prisma.domaine.delete({
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
