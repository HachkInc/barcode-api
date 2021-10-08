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
import { Event, User } from "@prisma/client";
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { EventEntity } from "./entities/event.entity";
import { UserEntity } from "../users/entities/user.entity";
import { PAGE_SIZE } from "../constants/pagination";
import { Pagination } from "../pagination/pagination";

@Controller('events')
@ApiTags('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiCreatedResponse({ type: EventEntity })
  async create(@Body() event: CreateEventDto): Promise<Event> {
    return this.eventsService.create(event)
  }

  @Get('/all')
  @ApiOkResponse({ type: [UserEntity] })
  async findAll(): Promise<Event[]>  {
    return this.eventsService.findAll();
  }

  @Get()
  @ApiCreatedResponse({type: [UserEntity],})
  async findAllWithPagination(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
      page: number,
    @Query('limit', new DefaultValuePipe(PAGE_SIZE), ParseIntPipe)
      limit: number,
  ): Promise<Pagination<Event>> {
    return this.eventsService.findAllWithPagination({ page, limit })
  }


  @Get(":id")
  @ApiOkResponse({ type: EventEntity })
  async findOne(@Param("id") id: string): Promise<Event> {
    return this.eventsService.findOne(+id);
  }

  @Patch(":id")
  @ApiCreatedResponse({ type: EventEntity })
  async update(
    @Param("id") id: string,
    @Body() event: UpdateEventDto
  ): Promise<Event> {
    const res = this.eventsService.update(+id, event);
    if (res) {
      return res;
    }
    throw new NotFoundException();
  }

  @Get('/:id/users')
  @ApiOkResponse({ type: [UserEntity] })
  async getEvents(@Param("id") id: string): Promise<User[]> {
    return this.eventsService.getUsers(+id);
  }

  @Delete(":id")
  @ApiOkResponse({ type: EventEntity })
  async remove(@Param("id") id: string): Promise<null> {
    const res = await this.eventsService.remove(+id)
    if (res) {
      return null
    }

    throw new NotFoundException()
  }
}
