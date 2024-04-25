import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateRiskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  cause: string;

  @IsString()
  @IsNotEmpty()
  details: string;

  @IsString()
  @IsOptional()
  existantDb: string;

  @IsNumber()
  @IsNotEmpty()
  frequency: number;

  @IsInt()
  @IsNotEmpty()
  financialImpact: number;

  @IsInt()
  @IsNotEmpty()
  legalImpact: number;

  @IsInt()
  @IsNotEmpty()
  activityImpact: number;

  @IsInt()
  @IsNotEmpty()
  peopleImpact: number;

  @IsInt()
  @IsNotEmpty()
  reputationImpact: number;

  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  active: boolean;

  @IsInt()
  @IsNotEmpty()
  activityId: number;

  @IsInt()
  @IsNotEmpty()
  entityId: number;

  @IsInt()
  @IsOptional()
  strategicObjectiveId: number;

  @IsInt()
  @IsOptional()
  operationalObjectiveId: number;
}
