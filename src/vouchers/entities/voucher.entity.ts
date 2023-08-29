import { Expose } from 'class-transformer';
import { IsDateString, IsPositive, IsString } from 'class-validator';
import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyEnum } from 'src/decorators/swagger.decorator';

enum Option {
  AMOUNT = 'amount',
  PERCENTAGE = 'percentage',
}
enum ProductType {
  SINGLE = 'single',
  DOUBLE = 'double',
  SHOPHOUSE = 'shophouse',
  APARTMENT = 'apartment',
}
@Entity()
export class Voucher extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'key' })
  id: string;

  @Column({ type: String })
  @ApiPropertyEnum(ProductType)
  @IsNotEmpty()
  @IsEnum(ProductType)
  productType: string;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  projectName: string;

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

  @Column({ type: 'bigint', nullable: true })
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;

  @Column({ type: 'float', nullable: true })
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  percentage: number;

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

  @AfterLoad()
  async loadAmount(): Promise<void> {
    if (this.amount) this.amount = Number(this.amount);
  }
}

export const createVoucherDTO = [
  'condition',
  'option',
  'amount',
  'percentage',
  'expire',
  'productType',
  'projectName',
] as const;
