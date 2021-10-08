import { Injectable } from "@nestjs/common";

import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Event } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { Pagination } from "../pagination/pagination";

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {
  }

  create(event: CreateEventDto): Promise<Event> {
    return this.prisma.event.create({ data: event });
  }

  findAll(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  async findAllWithPagination(params: {
    page: number
    limit: number
  }): Promise<Pagination<Event>> {
    const { page, limit } = params;

    const events = await this.prisma.event.findMany({
      skip: (page - 1) * limit,
      take: limit
    });

    return {
      page,
      limit,
      count: events.length,
      results: events
    };
  }

  findOne(id: number): Promise<Event> {
    return this.prisma.event.findUnique({ where: { id } });
  }

  update(id: number, event: UpdateEventDto): Promise<Event> {
    return this.prisma.event.update({
      where: { id },
      data: event
    });
  }

  remove(id: number): Promise<Event> {
    return this.prisma.event.delete({
      where: { id }
    });
  }
}
