import {
  Controller,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { EventsOnUsers } from "@prisma/client";

import { UsersOnEventsService } from './users-on-events.service';
import { PAGE_SIZE } from "../constants/pagination";
import { Pagination } from "../pagination/pagination";
import { EventsOnUsersEntity } from "./entities/users-on-event.entity";

@Controller('users-on-events')
@ApiTags('users-on-events')
export class UsersOnEventsController {
  constructor(private readonly usersOnEventsService: UsersOnEventsService) {}

  @Get('/all')
  @ApiOkResponse({ type: [EventsOnUsersEntity] })
  async findAll(): Promise<EventsOnUsers[]>  {
    return this.usersOnEventsService.findAll();
  }

  @Get()
  @ApiCreatedResponse({type: [EventsOnUsersEntity],})
  async findAllWithPagination(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
      page: number,
    @Query('limit', new DefaultValuePipe(PAGE_SIZE), ParseIntPipe)
      limit: number,
  ): Promise<Pagination<EventsOnUsers>> {
    return this.usersOnEventsService.findAllWithPagination({ page, limit })
  }
}
