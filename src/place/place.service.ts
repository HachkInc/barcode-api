import { Get, Injectable, Param } from "@nestjs/common";
import { CreatePlaceDto } from "./dto/create-place.dto";
import { UpdatePlaceDto } from "./dto/update-place.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Event, Place } from "@prisma/client";
import { Pagination } from "../pagination/pagination";

@Injectable()
export class PlaceService {
  constructor(private prisma: PrismaService) {
  }

  create(place: CreatePlaceDto): Promise<Place> {
    return this.prisma.place.create({ data: place });
  }

  getEvents(id: number): Promise<Event[]> {
    return this.prisma.event.findMany({
      where: {
        placeId: id
      }
    });
  }

  findAll(): Promise<Place[]> {
    return this.prisma.place.findMany();
  }

  async findAllWithPagination(params: {
    page: number
    limit: number
  }): Promise<Pagination<Place>> {
    const { page, limit } = params;

    const places = await this.prisma.place.findMany({
      skip: (page - 1) * limit,
      take: limit
    });

    return {
      page,
      limit,
      count: places.length,
      results: places
    };
  }

  findOne(id: number): Promise<Place> {
    return this.prisma.place.findUnique({ where: { id } });
  }

  update(id: number, place: UpdatePlaceDto): Promise<Place> {
    return this.prisma.place.update({
      where: { id },
      data: place
    });
  }

  remove(id: number): Promise<Place> {
    return this.prisma.place.delete({
      where: { id }
    });
  }
}
