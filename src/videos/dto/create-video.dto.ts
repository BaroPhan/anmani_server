import { PickType } from '@nestjs/swagger';
import { Video, createVideoDTO } from '../entities/video.entity';

export class CreateVideoDto extends PickType(Video, createVideoDTO) {}
