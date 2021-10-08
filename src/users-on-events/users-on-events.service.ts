import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { Event, EventsOnUsers } from "@prisma/client";
import { Pagination } from "../pagination/pagination";

@Injectable()
export class UsersOnEventsService {
  constructor(private prisma: PrismaService) {
  }

  findAll(): Promise<EventsOnUsers[]> {
    return this.prisma.eventsOnUsers.findMany();
  }

  async findAllWithPagination(params: {
    page: number
    limit: number
  }): Promise<Pagination<EventsOnUsers>> {
    const { page, limit } = params;

    const eventsOnUsers = await this.prisma.eventsOnUsers.findMany({
      skip: (page - 1) * limit,
      take: limit
    });

    return {
      page,
      limit,
      count: eventsOnUsers.length,
      results: eventsOnUsers
    };
  }
}
