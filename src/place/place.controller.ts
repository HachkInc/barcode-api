import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe, NotFoundException
} from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Event, Place } from "@prisma/client";

import { PAGE_SIZE } from "../constants/pagination";
import { Pagination } from "../pagination/pagination";
import { PlaceService } from "./place.service";
import { CreatePlaceDto } from "./dto/create-place.dto";
import { PlaceEntity } from "./entities/place.entity";
import { UpdatePlaceDto } from "./dto/update-place.dto";
import { EventEntity } from "../events/entities/event.entity";

@Controller("place")
@ApiTags("place")
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {
  }

  @Post()
  @ApiCreatedResponse({ type: PlaceEntity })
  async create(@Body() place: CreatePlaceDto): Promise<Place> {
    return this.placeService.create(place);
  }

  @Get("/all")
  @ApiOkResponse({ type: [PlaceEntity] })
  async findAll(): Promise<Place[]> {
    return this.placeService.findAll();
  }

  @Get("/:id/events")
  @ApiOkResponse({ type: [EventEntity] })
  async getEvents(@Param("id") id: string): Promise<Event[]> {
    return this.placeService.getEvents(+id);
  }

  @Get()
  @ApiCreatedResponse({ type: [PlaceEntity] })
  async findAllWithPagination(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe)
      page: number,
    @Query("limit", new DefaultValuePipe(PAGE_SIZE), ParseIntPipe)
      limit: number
  ): Promise<Pagination<Place>> {
    return this.placeService.findAllWithPagination({ page, limit });
  }


  @Get(":id")
  @ApiOkResponse({ type: PlaceEntity })
  async findOne(@Param("id") id: string): Promise<Place> {
    return this.placeService.findOne(+id);
  }

  @Patch(":id")
  @ApiCreatedResponse({ type: PlaceEntity })
  async update(
    @Param("id") id: string,
    @Body() place: UpdatePlaceDto
  ): Promise<Place> {
    const res = this.placeService.update(+id, place);
    if (res) {
      return res;
    }
    throw new NotFoundException();
  }

  @Delete(":id")
  @ApiOkResponse({ type: PlaceEntity })
  async remove(@Param("id") id: string): Promise<null> {
    const res = await this.placeService.remove(+id);
    if (res) {
      return null;
    }

    throw new NotFoundException();
  }
}
