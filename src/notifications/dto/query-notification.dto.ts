import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { QueryDTO } from 'src/utils/helper.utils';
import { IsIn, IsOptional, IsString } from 'class-validator';
import {
  Notification,
  queryNotificationDTO,
} from '../entities/notification.entity';
import { ApiPropertyEnum } from 'src/decorators/swagger.decorator';

export class QueryNotificationDto extends PartialType(
  IntersectionType(QueryDTO, PickType(Notification, queryNotificationDTO)),
) {
  @ApiPropertyEnum(queryNotificationDTO, { required: false })
  @IsOptional()
  @IsString()
  @IsIn(queryNotificationDTO)
  sort: string;
}
