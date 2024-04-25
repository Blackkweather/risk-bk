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
import { RiskService } from './risk.service';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('risks')
export class RiskController {
  constructor(private readonly riskService: RiskService) {}

  @Post()
  async create(@Body() createRiskDto: CreateRiskDto) {
    return await this.riskService.create(createRiskDto);
  }

  @Get()
  async findAll() {
    return await this.riskService.findAll();
  }

  @Get('project/:id')
  async getByProject(@Param('id', ParseIntPipe) id: number) {
    return await this.riskService.getByProject(id);
  }

  @Get('entity/:id')
  async getByEntity(@Param('id', ParseIntPipe) id: number) {
    return await this.riskService.getByEntity(id);
  }

  @Get('process/:id')
  async getByProcess(@Param('id', ParseIntPipe) id: number) {
    return await this.riskService.getByProcess(id);
  }

  @Get('activity/:id')
  async getByActivity(@Param('id', ParseIntPipe) id: number) {
    return await this.riskService.getByActivity(id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.riskService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRiskDto: UpdateRiskDto,
  ) {
    return await this.riskService.update(+id, updateRiskDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.riskService.remove(+id);
  }
}
