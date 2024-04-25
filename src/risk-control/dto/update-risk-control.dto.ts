import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateRiskControlDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  meanIndicator: string;

  @IsString()
  @IsOptional()
  meanOrganization: string;

  @IsString()
  @IsOptional()
  meanManualPre: string;

  @IsString()
  @IsOptional()
  meanManualPost: string;

  @IsString()
  @IsOptional()
  meanIntegrated: string;

  @IsString()
  @IsOptional()
  meanProgrammed: string;

  @IsString()
  @IsOptional()
  meanReference: string;

  @IsInt()
  @IsOptional()
  evaluation: number;

  @IsString()
  @IsOptional()
  proposedControl: string;

  @IsString()
  @IsOptional()
  proposedControlDescription: string;
}
