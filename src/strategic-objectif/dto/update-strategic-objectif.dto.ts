import { IsOptional, IsString } from 'class-validator';

export class UpdateStrategicObjectifDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
