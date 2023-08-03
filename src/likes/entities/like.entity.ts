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

@Entity()
export class Like extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
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
