import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import { User, Event } from "@prisma/client";
import { Pagination } from "../pagination/pagination";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  getEvents(id: number): Promise<Event[]> {
    return this.prisma.event.findMany({
      where: {
        users: {
          some: {
            userId: id
          }
        }
      }
    });
  }

  async findAllWithPagination(params: {
    page: number
    limit: number
  }): Promise<Pagination<User>> {
    const { page, limit } = params;

    const users = await this.prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit
    });

    return {
      page,
      limit,
      count: users.length,
      results: users
    };
  }

  findOne(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { telegramId: id } });
  }

  update(id: number, user: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: user
    });
  }

  remove(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id }
    });
  }
}
