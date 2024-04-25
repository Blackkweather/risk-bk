import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ClientRiskConfigType } from '@prisma/client';
import { Transform } from 'class-transformer';

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  denomination: string;

  @IsString()
  @IsOptional()
  sector: string;

  @IsString()
  @IsOptional()
  judicial: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  appetencyActive: boolean;

  @IsString()
  @IsOptional()
  config: ClientRiskConfigType;
}
