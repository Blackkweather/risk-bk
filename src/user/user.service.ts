import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { RoleService } from '../role/role.service';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private auth: AuthService,
    private rolesService: RoleService,
  ) {}

  async getUsers() {
    const allUsers = await this.prisma.user.findMany({
      include: {
        client: true,
        externalProjects: true,
        internalProjects: true,
      },
    });
    allUsers.forEach(function (user) {
      delete user.hash;
    });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new HttpException('User not found !', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      include: {
        client: true,
        internalProjects: true,
        externalProjects: true,
      },
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new HttpException('User not found !', HttpStatus.NOT_FOUND);
    }
    delete user.hash;
    return user;
  }

  async createUser(dto: CreateUserDto) {
    const hash: string = await this.auth.hashData(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          phone: dto.phone,
          lastName: dto.lastName,
          firstName: dto.firstName,
          role: { connect: { id: dto.roleId } },
          status: { connect: { id: dto.statusId } },
          client: dto.clientProfileId ? { connect: { id: dto.clientProfileId } } : {},
          hash,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException('Credentials taken !', HttpStatus.FORBIDDEN);
        }
        throw error;
      }
    }
  }

  async updateUser(userId: number, dto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          email: dto.email,
          phone: dto.phone,
          lastName: dto.lastName,
          firstName: dto.firstName,
          role: { connect: { id: dto.roleId } },
          status: { connect: { id: dto.statusId } },
          client: dto.clientProfileId ? { connect: { id: dto.clientProfileId } } : {},
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException('Credentials taken !', HttpStatus.FORBIDDEN);
        }
        throw error;
      }
    }
  }

  async deleteUser(userId: number) {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });
      return {
        message: 'User deleted',
      };
    } catch (error) {
      throw error;
    }
  }
}
