import { IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePlaceDto {
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ required: false })
  name: string;
}
