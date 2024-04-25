import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProcessDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  domaineId: number;

  @IsInt()
  @IsOptional()
  parentId: number;
}
