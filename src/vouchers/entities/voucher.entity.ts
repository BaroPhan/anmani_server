import { Expose } from 'class-transformer';
import { Product } from 'src/products/entities/product.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Voucher extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'key' })
  id: string;

  @ManyToOne(() => Product, {
    eager: true,
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column({ type: String })
  condition: string;

  @Column({ type: String })
  option: string;

  @Column({ type: Number, nullable: true })
  amount: number;

  @Column({ type: Number, nullable: true })
  percentage: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
