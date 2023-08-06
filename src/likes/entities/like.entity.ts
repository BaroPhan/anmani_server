import { User } from 'src/users/entities/user.entity';
import { Video } from 'src/videos/entities/video.entity';
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsExist } from 'src/decorators/isExist.decorator';

@Entity()
export class Like extends BaseEntity {
  @PrimaryColumn()
  @ApiProperty()
  @IsNotEmpty()
  @IsExist(User)
  userId: string;

  @PrimaryColumn()
  @ApiProperty()
  @IsNotEmpty()
  @IsExist(Video)
  videoId: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Video, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'videoId' })
  video: Video;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export const createLikeDTO = ['userId', 'videoId'] as readonly (keyof Like)[];
