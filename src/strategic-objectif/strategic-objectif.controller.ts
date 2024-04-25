import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { StrategicObjectifService } from './strategic-objectif.service';
import { CreateStrategicObjectifDto } from './dto/create-strategic-objectif.dto';
import { UpdateStrategicObjectifDto } from './dto/update-strategic-objectif.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('strategic-objectives')
export class StrategicObjectifController {
  constructor(private strategicObjectifService: StrategicObjectifService) {}

  @Post()
  async create(@Body() createStrategicObjectifDto: CreateStrategicObjectifDto) {
    return await this.strategicObjectifService.create(
      createStrategicObjectifDto,
    );
  }

  @Get()
  async findAll() {
    return await this.strategicObjectifService.findAll();
  }

  @Get('project/:id')
  async getByProject(@Param('id', ParseIntPipe) id: number) {
    return await this.strategicObjectifService.getByProject(id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.strategicObjectifService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStrategicObjectifDto: UpdateStrategicObjectifDto,
  ) {
    return await this.strategicObjectifService.update(
      +id,
      updateStrategicObjectifDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.strategicObjectifService.remove(+id);
  }
}
