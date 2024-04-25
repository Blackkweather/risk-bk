import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { OperationalObjectifService } from './operational-objectif.service';
import { CreateOperationalObjectifDto } from './dto/create-operational-objectif.dto';
import { UpdateOperationalObjectifDto } from './dto/update-operational-objectif.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('operational-objectives')
export class OperationalObjectifController {
  constructor(
    private readonly operationalObjectifService: OperationalObjectifService,
  ) {}

  @Post()
  async create(
    @Body() createOperationalObjectifDto: CreateOperationalObjectifDto,
  ) {
    return await this.operationalObjectifService.create(
      createOperationalObjectifDto,
    );
  }

  @Get()
  async findAll() {
    return await this.operationalObjectifService.findAll();
  }

  @Get('project/:id')
  async getByProject(@Param('id', ParseIntPipe) id: number) {
    return await this.operationalObjectifService.getByProject(id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.operationalObjectifService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOperationalObjectifDto: UpdateOperationalObjectifDto,
  ) {
    return await this.operationalObjectifService.update(
      +id,
      updateOperationalObjectifDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.operationalObjectifService.remove(+id);
  }
}
