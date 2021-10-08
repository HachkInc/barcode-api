import { IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  date: Date = new Date();

  @IsOptional()
  @ApiProperty({ required: false })
  ticketsAmount?: number;

  @IsOptional()
  @ApiProperty()
  placeId: number;

  // Todo users: User[]
}
