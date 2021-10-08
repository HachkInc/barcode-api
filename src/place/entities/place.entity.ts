import { ApiProperty } from "@nestjs/swagger";
import { Place, Prisma } from "@prisma/client";

export class PlaceEntity implements Place {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  // TODO
  // @ApiProperty()
  // events: string;

  constructor(partial: Partial<PlaceEntity>) {
    Object.assign(this, partial);
  }
}
