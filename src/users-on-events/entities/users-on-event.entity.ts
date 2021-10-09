import { ApiProperty } from "@nestjs/swagger";
import { EventsOnUsers } from "@prisma/client";

export class EventsOnUsersEntity implements EventsOnUsers {
  @ApiProperty({ required: true, nullable: false })
  userId: number;

  @ApiProperty({ required: true, nullable: false })
  eventId: number;

  @ApiProperty({ required: false })
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt: Date;
}
