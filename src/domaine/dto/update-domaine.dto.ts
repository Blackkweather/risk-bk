import { IsOptional, IsString } from 'class-validator';

export class UpdateDomaineDto {
  @IsString()
  @IsOptional()
  name: string;
}
