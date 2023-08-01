import { Expose } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'key' })
  id: string;

  @Column({ type: String })
  type: string;

  @Column({ type: String })
  tag: string;

  @Column({ type: 'json', nullable: true })
  investor: object;

  @Column({ type: String })
  name: string;

  @Column({ type: Number })
  price: number;

  @Column({ type: Number })
  originalPrice: number;

  @Column({ type: 'json' })
  information: object;

  @Column({ type: 'json' })
  policy: object;

  @Column({ type: 'json' })
  description: object;

  @Column({ type: 'json' })
  location: object;

  @Column({ type: Number, default: 0 })
  view: number;

  @Column({ type: String })
  thumbnail: string;

  @Column({ type: String })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
