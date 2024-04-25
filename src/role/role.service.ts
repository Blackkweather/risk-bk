import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}
  async create(createRoleDto: RoleDto) {
    try {
      return await this.prisma.role.create({
        data: {
          ...createRoleDto,
        },
      });
    } catch (error) {
      throw new HttpException("Couldn't create role !", HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    const allRoles = await this.prisma.role.findMany();
    const roles = allRoles.filter((role) => role.name !== 'SAdmin');
    return roles;
  }

  async findOne(id: number) {
    return await this.prisma.role.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateRoleDto: RoleDto) {
    return await this.prisma.role.update({
      where: {
        id: id,
      },
      data: {
        ...updateRoleDto,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.role.delete({
      where: {
        id: id,
      },
    });
  }
}
