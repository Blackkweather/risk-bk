import { IsOptional, IsString } from 'class-validator';

export class UpdateProcessDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
