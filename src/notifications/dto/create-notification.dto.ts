import { PickType } from '@nestjs/swagger';
import {
  Notification,
  createNotificationDTO,
} from '../entities/notification.entity';

export class CreateNotificationDto extends PickType(
  Notification,
  createNotificationDTO,
) {}
