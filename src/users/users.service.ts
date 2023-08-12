import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(this.userRepository.create(createUserDto));
  }

  findAll(queryUserDto: QueryUserDto) {
    const { page, limit, sort, order, ...query } = queryUserDto;
    return this.userRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      where: query,
      order: { [sort]: order },
    });
  }

  findByRoleId(roleId: string) {
    return this.userRepository.findBy({ roleId });
  }

  findOne(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.save(
      this.userRepository.create({
        id,
        ...updateUserDto,
      }),
    );
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
