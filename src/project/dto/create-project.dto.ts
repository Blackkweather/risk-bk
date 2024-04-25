import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from "class-transformer";

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  active: boolean;

  @IsInt()
  @IsNotEmpty()
  clientId: number;
}
