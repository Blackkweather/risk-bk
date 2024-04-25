import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { ProjectAssignUserDto } from "./dto/project-assign-user.dto";

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectService.create(createProjectDto);
  }

  @Post('assign-users/:id')
  async assignUsers(@Param('id', ParseIntPipe) id: number, @Body() assignUsersDto: ProjectAssignUserDto) {
    return await this.projectService.assignUsers(id, assignUsersDto);
  }

  @Get()
  async findAll() {
    return await this.projectService.findAll();
  }

  @Get('client/:id')
  async getByClient(@Param('id', ParseIntPipe) id: number) {
    return await this.projectService.getByClient(id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.projectService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.projectService.remove(+id);
  }
}
