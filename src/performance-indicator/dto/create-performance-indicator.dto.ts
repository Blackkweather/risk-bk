import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePerformanceIndicatorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  currentValue: number;

  @IsInt()
  @IsNotEmpty()
  targetValue: number;

  @IsInt()
  @IsNotEmpty()
  projectId: number;
}
