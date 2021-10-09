import { IsNotEmpty, IsOptional } from "class-validator";
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
  @ApiProperty({required: false, nullable: true})
  placeId: number;
}
