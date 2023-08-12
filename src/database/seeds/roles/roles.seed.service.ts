import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { In, Repository } from 'typeorm';
import * as seedData from './roles.seed.json';

@Injectable()
export class RolesSeedService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async seed() {
    const users = await this.roleRepository.countBy({
      name: In(seedData.map(({ name }) => name)),
    });
    if (users !== seedData.length)
      await this.roleRepository.upsert(seedData, ['id']);
  }
}
