import { PartialType } from '@nestjs/swagger';
import { CreateUsersOnEventDto } from './create-users-on-event.dto';

export class UpdateUsersOnEventDto extends PartialType(CreateUsersOnEventDto) {}
