import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';

@Module({
  controllers: [PlaceController],
  providers: [PlaceService]
})
export class PlaceModule {}
