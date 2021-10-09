import { Event } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class EventEntity implements Event {
  @ApiProperty({ required: false })
  id: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true, nullable: true })
  date: Date | null;

  @ApiProperty({ required: false, nullable: true })
  ticketsAmount: number | null;

  @ApiProperty({ required: false, nullable: false })
  placeId: number | null;

  @ApiProperty({ required: false })
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt: Date;

  constructor(partial: Partial<EventEntity>) {
    Object.assign(this, partial);
  }
}
