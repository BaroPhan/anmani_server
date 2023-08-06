import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
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
export class Cart extends BaseEntity {
  @PrimaryColumn()
  @ApiProperty()
  @IsNotEmpty()
  @IsExist(User)
  userId: string;

  @PrimaryColumn()
  @ApiProperty()
  @IsNotEmpty()
  @IsExist(Product)
  productId: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Product, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export const createCartDTO = [
  'userId',
  'productId',
  'status',
] as readonly (keyof Cart)[];
