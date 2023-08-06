import { PickType } from '@nestjs/swagger';
import { Like, createLikeDTO } from '../entities/like.entity';

export class CreateLikeDto extends PickType(Like, createLikeDTO) {}
