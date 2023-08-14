import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';
import {
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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsExist } from 'src/decorators/isExist.decorator';
import { ApiPropertyEnum } from 'src/decorators/swagger.decorator';

enum Option {
  AMOUNT = 'amount',
  PERCENTAGE = 'percentage',
}
@Entity()
export class Voucher extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'key' })
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsExist(Product)
  productId: string;

  @ManyToOne(() => Product, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  condition: string;

  @Column({ type: String })
  @ApiPropertyEnum(Option)
  @IsNotEmpty()
  @IsEnum(Option)
  option: string;

  @Column({ type: Number, nullable: true })
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  amount: number;

  @Column({ type: Number, nullable: true })
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  percentage: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export const createVoucherDTO = [
  'productId',
  'condition',
  'option',
  'amount',
  'percentage',
] as const;
