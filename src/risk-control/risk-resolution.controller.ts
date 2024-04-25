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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { RiskResolutionService } from './risk-resolution.service';
import { CreateRiskControlDto } from './dto/create-risk-control.dto';
import { UpdateRiskControlDto } from './dto/update-risk-control.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('risk-controls')
export class RiskResolutionController {
  constructor(private readonly riskResolutionService: RiskResolutionService) {}

  @Post()
  async create(@Body() createRiskResolutionDto: CreateRiskControlDto) {
    return await this.riskResolutionService.create(createRiskResolutionDto);
  }

  @Get()
  async findAll() {
    return await this.riskResolutionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.riskResolutionService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRiskResolutionDto: UpdateRiskControlDto,
  ) {
    return await this.riskResolutionService.update(
      +id,
      updateRiskResolutionDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.riskResolutionService.remove(+id);
  }
}
