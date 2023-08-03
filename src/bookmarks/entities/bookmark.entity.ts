import { Expose } from 'class-transformer';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Video } from 'src/videos/entities/video.entity';
import {
  AfterInsert,
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Bookmark extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'key' })
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid', nullable: true })
  videoId: string;

  @Column({ type: 'uuid', nullable: true })
  productId: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Video, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'videoId' })
  video: Video;

  @ManyToOne(() => Product, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @AfterInsert()
  async checkBookmark() {
    const option = {
      userId: this.userId,
      ...(this.productId && { productId: this.productId }),
      ...(this.videoId && { videoId: this.videoId }),
    };
    const bookmark = await Bookmark.find({ where: option });
    if (bookmark.length > 0) {
      await Bookmark.delete(option);
      setTimeout(async () => {
        await this.remove();
      }, 100);
    }
  }

  @Column({ type: String })
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
