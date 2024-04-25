import { IsArray, IsNumber } from 'class-validator';

export class AddUsersDto {
  @IsArray()
  @IsNumber({}, { each: true })
  userIds: number[];
}
