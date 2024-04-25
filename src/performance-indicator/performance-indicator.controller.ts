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
import { PerformanceIndicatorService } from './performance-indicator.service';
import { CreatePerformanceIndicatorDto } from './dto/create-performance-indicator.dto';
import { UpdatePerformanceIndicatorDto } from './dto/update-performance-indicator.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('performance-indicators')
export class PerformanceIndicatorController {
  constructor(
    private readonly performanceIndicatorService: PerformanceIndicatorService,
  ) {}

  @Post()
  async create(
    @Body() createPerformanceIndicatorDto: CreatePerformanceIndicatorDto,
  ) {
    return await this.performanceIndicatorService.create(
      createPerformanceIndicatorDto,
    );
  }

  @Get()
  async findAll() {
    return await this.performanceIndicatorService.findAll();
  }

  @Get('project/:id')
  async getByProject(@Param('id', ParseIntPipe) id: number) {
    return await this.performanceIndicatorService.getByProject(id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.performanceIndicatorService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePerformanceIndicatorDto: UpdatePerformanceIndicatorDto,
  ) {
    return await this.performanceIndicatorService.update(
      +id,
      updatePerformanceIndicatorDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.performanceIndicatorService.remove(+id);
  }
}
