import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { ArrayContains, Repository } from 'typeorm';
import { QueryNotificationDto } from './dto/query-notification.dto';

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

  findAll(queryNotifcationDto: QueryNotificationDto) {
    const { page, limit, sort, order, ...query } = queryNotifcationDto;
    return this.notificationRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      where: query,
      order: { [sort]: order },
    });
  }

  findOne(id: string) {
    return this.notificationRepository.findOne({ where: { id } });
  }

  findByUserId(userId: string) {
    return this.notificationRepository.find({
      where: [
        { users: ArrayContains([userId]) },
        { productIds: ArrayContains([]) },
      ],
    });
  }

  update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return this.notificationRepository.update(id, updateNotificationDto);
  }

  remove(id: string) {
    return this.notificationRepository.delete(id);
  }
}
