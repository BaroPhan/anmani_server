import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  In,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { IsExist } from 'src/decorators/isExist.decorator';
import { ApiPropertyEnum } from 'src/decorators/swagger.decorator';
import { Exclude, Expose } from 'class-transformer';
import { Voucher } from 'src/vouchers/entities/voucher.entity';
import { Helper } from 'src/utils/helper.utils';

export enum Status {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
}
@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'key' })
  id: string;

  @Column({ type: 'uuid' })
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  @IsExist(User)
  userId: string;

  @Column({ type: 'uuid' })
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

  @Column({ type: 'uuid', nullable: true, array: true })
  @ApiPropertyOptional()
  @IsOptional()
  @Exclude({ toPlainOnly: true })
  @IsExist(Voucher)
  voucherIds: string[];

  @ManyToMany(() => Voucher, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  vouchers: Voucher[];

  @Column({ type: String, default: Status.PENDING })
  @ApiPropertyEnum(Status)
  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @Column({ type: Date, nullable: true })
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  date: Date;

  @Column({ type: String, nullable: true })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  meetingLocation: String;

  @Column({ type: String, nullable: true })
  @ApiPropertyOptional()
  @IsOptional()
  @Matches(Helper.regex.phoneNumber, {
    message: 'phoneNumber must be a valid phone number',
  })
  phoneNumber: string;

  @Column('bigint')
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @AfterLoad()
  async loadVouchers(): Promise<void> {
    if (this.voucherIds && this.voucherIds.length > 0) {
      this.vouchers = await Voucher.findBy({ id: In(this.voucherIds) });
    }
  }
}
export const queryCartDto = ['userId', 'productId', 'status'] as const;

export const createCartDTO = [
  ...queryCartDto,
  'voucherIds',
  'date',
  'meetingLocation',
  'phoneNumber',
  'price',
] as const;
