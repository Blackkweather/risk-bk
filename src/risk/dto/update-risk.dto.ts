import { IsBoolean, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateRiskDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  cause: string;

  @IsString()
  @IsOptional()
  details: string;

  @IsString()
  @IsOptional()
  existantDb: string;

  @IsNumber()
  @IsOptional()
  frequency: number;

  @IsInt()
  @IsOptional()
  financialImpact: number;

  @IsInt()
  @IsOptional()
  legalImpact: number;

  @IsInt()
  @IsOptional()
  activityImpact: number;

  @IsInt()
  @IsOptional()
  peopleImpact: number;

  @IsInt()
  @IsOptional()
  reputationImpact: number;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  active: boolean;

  @IsInt()
  @IsOptional()
  riskFamilyId: number;
}
