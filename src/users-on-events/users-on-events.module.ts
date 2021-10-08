import { Module } from '@nestjs/common';
import { UsersOnEventsService } from './users-on-events.service';
import { UsersOnEventsController } from './users-on-events.controller';

@Module({
  controllers: [UsersOnEventsController],
  providers: [UsersOnEventsService]
})
export class UsersOnEventsModule {}
