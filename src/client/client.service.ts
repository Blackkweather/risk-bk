import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AddUsersDto } from './dto/add-users.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    try {
      return await this.prisma.clientProfile.create({
        data: {
          denomination: createClientDto.denomination,
          sector: createClientDto.sector,
          judicial: createClientDto.judicial,
          appetencyActive: createClientDto.appetencyActive,
          config: createClientDto.config,
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
      return await this.prisma.clientProfile.findMany({
        include: {
          clientUsers: {
            select: {
              hash: false,
              id: true,
              email: true,
              lastName: true,
              firstName: true,
              phone: true,
            },
          },
          projects: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.clientProfile.findUnique({
        include: {
          clientUsers: {
            select: {
              hash: false,
              id: true,
              email: true,
              lastName: true,
              firstName: true,
              phone: true,
            },
          },
          projects: true,
        },
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      return await this.prisma.clientProfile.update({
        where: {
          id: id,
        },
        data: {
          denomination: updateClientDto.denomination,
          sector: updateClientDto.sector,
          judicial: updateClientDto.judicial,
          appetencyActive: updateClientDto.appetencyActive,
          config: updateClientDto.config,
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
      return await this.prisma.clientProfile.delete({
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

  async assignUsers(id: number, dto: AddUsersDto) {
    try {
      await this.prisma.clientProfile.update({
        where: {
          id: id,
        },
        data: {
          clientUsers: {
            set: [],
          },
        },
      });
      return await this.prisma.clientProfile.update({
        where: {
          id: id,
        },
        data: {
          clientUsers: { connect: dto.userIds.map((id: number) => ({ id })) },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
