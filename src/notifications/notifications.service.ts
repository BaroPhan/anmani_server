import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  create(createNotificationDto: CreateNotificationDto) {
    return this.notificationRepository.save(
      this.notificationRepository.create(createNotificationDto),
    );
  }

  findAll() {
    return this.notificationRepository.find();
  }

  findOne(id: string) {
    return this.notificationRepository.findOne({ where: { id } });
  }

  update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return this.notificationRepository.update(id, updateNotificationDto);
  }

  remove(id: string) {
    return this.notificationRepository.delete(id);
  }
}
