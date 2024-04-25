import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEntityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  projectId: number;

  @IsInt()
  @IsOptional()
  parentId: number;
}
