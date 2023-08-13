import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as seedData from './users.seed.json';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersSeedService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async seed() {
    const users = await this.userRepository.count();
    if (users === 0) await this.userRepository.upsert(seedData, ['id']);
  }
}
