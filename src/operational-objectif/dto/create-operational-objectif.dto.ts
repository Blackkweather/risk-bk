import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOperationalObjectifDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  strategicObjectiveId: number;
}
