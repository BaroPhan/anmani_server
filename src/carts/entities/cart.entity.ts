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
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { IsExist } from 'src/decorators/isExist.decorator';
import { ApiPropertyEnum } from 'src/decorators/swagger.decorator';

enum Status {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
}
@Entity()
export class Cart extends BaseEntity {
  @PrimaryColumn()
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  @IsExist(User)
  userId: string;

  @PrimaryColumn()
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  @IsExist(Product)
  productId: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Product, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: String, default: Status.PENDING })
  @ApiPropertyEnum(Status)
  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export const createCartDTO = ['userId', 'productId', 'status'] as const;
