import { IsOptional, IsString } from 'class-validator';

export class UpdateEntityDto {
  @IsString()
  @IsOptional()
  name: string;
}
