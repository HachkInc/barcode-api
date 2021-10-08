import { User } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  telegramId: string;

  @ApiProperty({ required: false, nullable: true })
  qr: string | null;

  @ApiProperty({ required: false, nullable: true })
  dateOfBirth: Date | null;

  @ApiProperty({ required: false, nullable: true })
  name: string | null;

  @ApiProperty()
  email: string;

  @ApiProperty()
  surname: string;

  // TODO
  // events: Event[]

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}