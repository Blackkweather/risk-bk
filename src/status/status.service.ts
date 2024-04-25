import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StatusDto } from './dto/status.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class StatusService {
  constructor(private prisma: PrismaService) {}
  async create(createStatusDto: StatusDto) {
    try {
      return await this.prisma.status.create({
        data: {
          ...createStatusDto,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Something went wrong !',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async findAll() {
    try {
      return await this.prisma.status.findMany();
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Something went wrong !',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.status.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Something went wrong !',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async update(id: number, updateStatusDto: StatusDto) {
    try {
      return await this.prisma.status.update({
        where: {
          id: id,
        },
        data: {
          ...updateStatusDto,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Something went wrong !',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.status.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Something went wrong !',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
