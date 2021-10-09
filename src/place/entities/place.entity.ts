import { ApiProperty } from "@nestjs/swagger";
import { Place } from "@prisma/client";

export class PlaceEntity implements Place {
  @ApiProperty({ required: false })
  id: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: false })
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt: Date;

  constructor(partial: Partial<PlaceEntity>) {
    Object.assign(this, partial);
  }
}
