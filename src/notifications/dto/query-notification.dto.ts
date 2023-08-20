import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { QueryDTO } from 'src/utils/helper.utils';
import { IsIn, IsOptional, IsString } from 'class-validator';
import {
  Notification,
  createNotificationDTO,
} from '../entities/notification.entity';
import { ApiPropertyEnum } from 'src/decorators/swagger.decorator';

export class QueryNotificationDto extends PartialType(
  IntersectionType(QueryDTO, PickType(Notification, createNotificationDTO)),
) {
  @ApiPropertyEnum(createNotificationDTO, { required: false })
  @IsOptional()
  @IsString()
  @IsIn(createNotificationDTO)
  sort: string;
}
