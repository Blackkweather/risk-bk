import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from "class-transformer";

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  active: boolean;
}
