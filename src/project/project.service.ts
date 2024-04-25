import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ProjectAssignUserDto } from "./dto/project-assign-user.dto";

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      return await this.prisma.project.create({
        data: {
          name: createProjectDto.name,
          active: createProjectDto.active,
          client: { connect: { id: createProjectDto.clientId } },
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
      return await this.prisma.project.findMany({
        include: {
          client: true,
          domaines: true,
          entities: true,
          strategicObjectives: true,
          performanceIndicators: true,
          riskFamilies: true,
          externalUsers: {
            select: {
              hash: false,
              id: true,
              email: true,
              lastName: true,
              firstName: true,
              phone: true,
            },
          },
          internalUsers: {
            select: {
              hash: false,
              id: true,
              email: true,
              lastName: true,
              firstName: true,
              phone: true,
            },
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

  async getByClient(id: number) {
    try {
      return await this.prisma.project.findMany({
        where: {
          clientId: id,
        },
        include: {
          client: true,
          domaines: true,
          entities: true,
          strategicObjectives: true,
          performanceIndicators: true,
          riskFamilies: true,
          externalUsers: {
            select: {
              hash: false,
              id: true,
              email: true,
              lastName: true,
              firstName: true,
              phone: true,
            },
          },
          internalUsers: {
            select: {
              hash: false,
              id: true,
              email: true,
              lastName: true,
              firstName: true,
              phone: true,
            },
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

  async findOne(id: number) {
    try {
      return await this.prisma.project.findUnique({
        include: {
          client: true,
          domaines: true,
          entities: true,
          strategicObjectives: true,
          performanceIndicators: true,
          riskFamilies: true,
          externalUsers: {
            select: {
              hash: false,
              id: true,
              email: true,
              lastName: true,
              firstName: true,
              phone: true,
            },
          },
          internalUsers: {
            select: {
              hash: false,
              id: true,
              email: true,
              lastName: true,
              firstName: true,
              phone: true,
            },
          },
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

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    try {
      return await this.prisma.project.update({
        where: {
          id: id,
        },
        data: {
          name: updateProjectDto.name,
          active: updateProjectDto.active,

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

  async assignUsers(id: number, dto: ProjectAssignUserDto) {
    try {
      await this.prisma.project.update({
        where: {
          id: id,
        },
        data: {
          externalUsers: {
            set: [],
          },
          internalUsers: {
            set: [],
          },
        },
      });
      return await this.prisma.project.update({
        where: {
          id: id,
        },
        data: {
          externalUsers: {
            connect: dto.externalUserIds.map((id: number) => ({ id })),
          },
          internalUsers: {
            connect: dto.internalUserIds.map((id: number) => ({ id })),
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

  async remove(id: number) {
    try {
      return await this.prisma.project.delete({
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
