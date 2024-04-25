import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRiskControlDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  meanIndicator: string;

  @IsString()
  @IsNotEmpty()
  meanOrganization: string;

  @IsString()
  @IsNotEmpty()
  meanManualPre: string;

  @IsString()
  @IsNotEmpty()
  meanManualPost: string;

  @IsString()
  @IsNotEmpty()
  meanIntegrated: string;

  @IsString()
  @IsNotEmpty()
  meanProgrammed: string;

  @IsString()
  @IsNotEmpty()
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

  @IsInt()
  @IsNotEmpty()
  riskId: number;
}
