import { Exclude, Expose } from 'class-transformer';
import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  In,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { IsExist } from 'src/decorators/isExist.decorator';
import { ApiPropertyEnum } from 'src/decorators/swagger.decorator';
import { Product } from 'src/products/entities/product.entity';
import { Cart, Status } from 'src/carts/entities/cart.entity';

enum Type {
  UPDATE = 'update',
  INFO = 'info',
}
@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'key' })
  id: string;

  @Column({ type: String })
  @ApiPropertyEnum(Type)
  @IsNotEmpty()
  @IsEnum(Type)
  type: string;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  avatar: string;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @Column({ type: 'uuid', array: true, nullable: true })
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  users: string[];

  @Column({ type: 'uuid', nullable: true, array: true })
  @ApiPropertyOptional()
  @IsOptional()
  @Exclude({ toPlainOnly: true })
  @IsExist(Product)
  productIds: string[];

  @ManyToMany(() => Product, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  products: Product[];

  @Column({ type: Date })
  @ApiProperty()
  @IsDateString()
  expire: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async loadUsers(): Promise<void> {
    if (this.productIds && this.productIds.length > 0) {
      const carts = await Cart.findBy({
        productId: In(this.productIds),
        status: In([Status.PROCESSING, Status.COMPLETED]),
      });
      this.users = [...new Set(carts.map(({ userId }: Cart) => userId))];
    }
  }

  @AfterLoad()
  async loadProducts(): Promise<void> {
    if (this.productIds && this.productIds.length > 0) {
      this.products = await Product.findBy({ id: In(this.productIds) });
    }
  }
}

export const queryNotificationDTO = ['type', 'title'] as const;

export const createNotificationDTO = [
  ...queryNotificationDTO,
  'avatar',
  'expire',
  'content',
  'productIds',
] as const;
