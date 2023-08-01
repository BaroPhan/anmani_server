import { Expose } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Video extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'key' })
  id: string;

  @Column({ type: String })
  title: string;

  @Column({ type: String })
  url: string;

  @Column({ nullable: true })
  parentId: string;

  @ManyToOne(() => Video, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'parentId' })
  parentVideo: Video;

  @OneToMany(() => Video, (video) => video.parentVideo, {
    cascade: true,
    eager: true,
  })
  childrenVideos: Video[];

  @RelationId((video: Video) => video.childrenVideos)
  @Column({ type: 'json', nullable: true })
  stories: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
