import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUsersOnEventDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  userId: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  eventId: string;
}

