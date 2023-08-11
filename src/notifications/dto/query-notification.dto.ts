import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { QueryDTO } from 'src/utils/helper.utils';
import { IsIn, IsOptional, IsString } from 'class-validator';
import {
  Notification,
  createNotificationDTO,
} from '../entities/notification.entity';

export class QueryNotificationDto extends PartialType(
  IntersectionType(QueryDTO, PickType(Notification, createNotificationDTO)),
) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(createNotificationDTO)
  sort: string;
}
