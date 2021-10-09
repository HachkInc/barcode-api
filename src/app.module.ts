import { MiddlewareConsumer, Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from './users/users.module';
import { PlaceModule } from './place/place.module';
import { EventsModule } from './events/events.module';
import { UsersOnEventsModule } from './users-on-events/users-on-events.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from "./middleware/auth.middleware";

@Module({
  imports: [PrismaModule, UsersModule, PlaceModule, EventsModule, UsersOnEventsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("/users", "/events", "/place", "/users-on-events");
  }
}
