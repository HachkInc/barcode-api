import { User } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class UserEntity implements User {
  @ApiProperty({ required: false })
  id: number;

  @ApiProperty({required: false})
  age: number;

  @ApiProperty({ required: true })
  telegramId: string;

  @ApiProperty({ required: true })
  phone: string;

  @ApiProperty({ required: false, nullable: true })
  name: string | null;

  @ApiProperty({ required: false, nullable: true })
  qr: string | null;

  @ApiProperty({ required: false })
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
