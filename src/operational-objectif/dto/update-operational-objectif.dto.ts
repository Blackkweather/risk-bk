import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOperationalObjectifDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
