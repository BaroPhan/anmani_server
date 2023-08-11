import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { Repository } from 'typeorm';
import { QueryVideoDto } from './dto/query-video.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  create(createVideoDto: CreateVideoDto) {
    return this.videoRepository.save(
      this.videoRepository.create(createVideoDto),
    );
  }

  findAll(queryVideoDto: QueryVideoDto) {
    const { page, limit, sort, order, ...query } = queryVideoDto;
    return this.videoRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      where: query,
      order: { [sort]: order },
    });
  }

  async findOne(id: string) {
    return this.videoRepository.findOne({ where: { id } });
  }

  update(id: string, updateVideoDto: UpdateVideoDto) {
    return this.videoRepository.update(id, updateVideoDto);
  }

  remove(id: string) {
    return this.videoRepository.delete(id);
  }
}
