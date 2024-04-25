import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdatePerformanceIndicatorDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsOptional()
  currentValue: number;

  @IsInt()
  @IsOptional()
  targetValue: number;
}
