import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { Repository } from 'typeorm';

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

  findAll() {
    return this.videoRepository.find();
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
