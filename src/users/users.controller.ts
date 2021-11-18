import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import {UsersService} from "./users.service";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {UserEntity} from "./entities/user.entity";
import {Event, User} from "@prisma/client";
import {PAGE_SIZE} from "../constants/pagination";
import {Pagination} from "../pagination/pagination";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  async create(@Body() user: UserEntity): Promise<User> {
    return this.usersService.create(user)
  }

  @Get('/all')
  @ApiOkResponse({ type: [UserEntity] })
  async findAll(): Promise<User[]>  {
    return this.usersService.findAll();
  }

  @Get('/:id/events')
  @ApiOkResponse({ type: [UserEntity] })
  async getEvents(@Param("id") id: string): Promise<Event[]> {
    return this.usersService.getEvents(+id);
  }

  @Get()
  @ApiCreatedResponse({type: [UserEntity],})
  async findAllWithPagination(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
      page: number,
    @Query('limit', new DefaultValuePipe(PAGE_SIZE), ParseIntPipe)
      limit: number,
  ): Promise<Pagination<User>> {
    return this.usersService.findAllWithPagination({ page, limit })
  }


  @Get(":id")
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param("id") id: string): Promise<User | any> {
    const user = await this.usersService.findOne(id);
    if (user === null) {
      return {exist: false}
    }
    return {user, exist: true};
  }

  @Patch(":id")
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param("id") id: string,
    @Body() user: UserEntity
  ): Promise<User> {
    const res = this.usersService.update(+id, user);
    if (res) {
      return res;
    }
    throw new NotFoundException();
  }

  // TODO qr code update
  // @UseInterceptors(FileInterceptor('file'))
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   description: 'List of cats',
  //   type: FileUploadDto,
  // })
  // uploadFile(@UploadedFile() file) {}

  @Delete(":id")
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param("id") id: string): Promise<null> {
    const res = await this.usersService.remove(+id)
    if (res) {
      return null
    }

    throw new NotFoundException()
  }
}
