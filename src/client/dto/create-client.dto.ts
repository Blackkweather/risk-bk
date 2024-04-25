import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ClientRiskConfigType } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  denomination: string;

  @IsString()
  @IsNotEmpty()
  sector: string;

  @IsString()
  @IsNotEmpty()
  judicial: string;

  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  appetencyActive: boolean;

  @IsString()
  @IsNotEmpty()
  config: ClientRiskConfigType;
}
