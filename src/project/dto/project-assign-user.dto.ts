import { IsArray, IsNumber } from 'class-validator';

export class ProjectAssignUserDto {
  @IsArray()
  @IsNumber({}, { each: true })
  internalUserIds: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  externalUserIds: number[];
}
