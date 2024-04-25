import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateActivityDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber({}, { each: true })
  @IsOptional()
  riskIds: number[];

  @IsNumber({}, { each: true })
  @IsOptional()
  strategicObjectivesIds: number[];
}
