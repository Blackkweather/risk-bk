import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDomaineDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  projectId: number;
}
