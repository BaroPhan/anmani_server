import { Exclude, Expose } from 'class-transformer';
import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  In,
  OneToMany,
  PrimaryGeneratedColumn,
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

  @Column({ type: 'json', nullable: true })
  @Exclude({ toClassOnly: true })
  stories: string[];

  @OneToMany(() => Video, (video) => video.stories)
  @Expose({ name: 'stories' })
  children: Video[];

  @AfterLoad()
  async loadChildren(): Promise<void> {
    if (this.stories && this.stories.length > 0) {
      this.children = await Video.findBy({ id: In(this.stories) });
    }
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
