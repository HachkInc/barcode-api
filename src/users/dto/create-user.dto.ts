import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  telegramId: string;

  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsOptional()
  @MinLength(3)
  @ApiProperty({ required: false })
  name?: string;

  @IsOptional()
  @MaxLength(50)
  @ApiProperty({ required: false })
  surname?: string;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  dateOfBirth?: Date = new Date();

  @IsOptional()
  @ApiProperty({ required: false })
  qr?: string;
}
