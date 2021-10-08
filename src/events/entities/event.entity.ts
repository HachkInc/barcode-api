import { Event } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class EventEntity implements Event {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  date: Date | null;

  @ApiProperty({ required: false, nullable: true })
  ticketsAmount: number | null;

  @ApiProperty({ required: false, nullable: false })
  placeId: number;

  // TODO
  // @ApiProperty({ required: false, nullable: true })
  // place: Place[]

  constructor(partial: Partial<EventEntity>) {
    Object.assign(this, partial);
  }
}
