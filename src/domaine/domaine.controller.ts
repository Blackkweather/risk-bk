import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
} from '@nestjs/common';
import { DomaineService } from './domaine.service';
import { CreateDomaineDto } from './dto/create-domaine.dto';
import { UpdateDomaineDto } from './dto/update-domaine.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('domaines')
export class DomaineController {
  constructor(private readonly domaineService: DomaineService) {}

  @Post()
  async create(@Body() createDomaineDto: CreateDomaineDto) {
    return await this.domaineService.create(createDomaineDto);
  }

  @Get()
  async findAll() {
    return await this.domaineService.findAll();
  }

  @Get('project/:id')
  async getByProject(@Param('id', ParseIntPipe) id: number) {
    return await this.domaineService.getByProject(id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.domaineService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDomaineDto: UpdateDomaineDto,
  ) {
    return await this.domaineService.update(+id, updateDomaineDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.domaineService.remove(+id);
  }
}
