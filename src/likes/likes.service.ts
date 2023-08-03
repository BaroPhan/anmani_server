import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async create(createLikeDto: CreateLikeDto) {
    const isExist = await this.likeRepository.findOneBy(createLikeDto);
    if (isExist) return this.likeRepository.delete(createLikeDto);
    return this.likeRepository.save(this.likeRepository.create(createLikeDto));
  }

  findAll() {
    return this.likeRepository.find();
  }

  findOne(videoId: string) {
    return this.likeRepository.findOne({ where: { videoId } });
  }

  update(videoId: string, updateLikeDto: UpdateLikeDto) {
    return this.likeRepository.update({ videoId }, updateLikeDto);
  }

  remove(videoId: string) {
    return this.likeRepository.delete({ videoId });
  }
}
