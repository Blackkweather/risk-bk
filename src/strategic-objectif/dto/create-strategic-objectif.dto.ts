import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateStrategicObjectifDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  projectId: number;
}
