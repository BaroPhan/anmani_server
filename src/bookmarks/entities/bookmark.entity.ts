import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { IsExist } from 'src/decorators/isExist.decorator';
import { ApiPropertyEnum } from 'src/decorators/swagger.decorator';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
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

enum Type {
  LATER = 'later',
  BUY = 'buy',
  RENT = 'rent',
}
@Entity()
export class Bookmark extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'key' })
  id: string;

  @Column({ type: 'uuid' })
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  @IsExist(User)
  userId: string;

  @Column({ type: 'uuid', nullable: true })
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  @IsExist(Product)
  productId: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Product, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: String })
  @ApiPropertyEnum(Type)
  @IsNotEmpty()
  @IsEnum(Type)
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @AfterInsert()
  async checkBookmark() {
    const option = {
      userId: this.userId,
      ...(this.productId && { productId: this.productId }),
    };
    const bookmark = await Bookmark.find({ where: option });
    if (bookmark.length > 0) {
      await Bookmark.delete(option);
      setTimeout(async () => {
        await this.remove();
      }, 100);
    }
  }
}

export const createBookmarkDTO = ['userId', 'productId', 'type'] as const;
