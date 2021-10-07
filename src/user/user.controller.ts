import { Controller, Get } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Controller("/users")
export class UserController {
  async create() {

  }

  @Get()
  async getAll() {
    const allUsers = await prisma.user.findMany({});

    return allUsers;
  }

  async getOne() {

  }

  async delete() {

  }
}