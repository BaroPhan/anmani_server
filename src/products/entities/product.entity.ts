/* eslint-disable max-classes-per-file */
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
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

enum ProductType {
  SINGLE = 'single',
  DOUBLE = 'double',
  SHOPHOUSE = 'shopehouse',
  APARTMENT = 'apartment',
}
enum Tag {
  INVESTOR = 'investor',
  TRANSFER = 'transfer',
  RENT = 'rent',
}
enum Status {
  SOLD = 'sold',
  INSTOCK = 'in-stock',
}
class Investor {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  logo: string;
}
class Information {
  @ApiProperty()
  @IsNotEmpty()
  landArea: string;

  @ApiProperty()
  @IsNotEmpty()
  floor: string;

  @ApiProperty()
  @IsNotEmpty()
  bedroom: string;

  @ApiProperty()
  @IsNotEmpty()
  bathroom: string;

  @ApiProperty()
  @IsNotEmpty()
  floorArea: string;

  @ApiProperty()
  @IsNotEmpty()
  other: string;
}
class Policy {
  @ApiProperty()
  @IsNotEmpty()
  main: string;

  @ApiProperty()
  @IsNotEmpty()
  loan: string;

  @ApiProperty()
  @IsNotEmpty()
  equity: string;
}
class Description {
  @ApiProperty()
  @IsNotEmpty()
  pros: string;

  @ApiProperty()
  @IsNotEmpty()
  cons: string;
}
class LocationDetail {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  distance: string;
}
class Location {
  @ApiProperty()
  @IsNotEmpty()
  detail: string;

  @ApiProperty()
  @IsNotEmpty()
  main: string;

  @ApiProperty()
  @IsNotEmpty()
  sub: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  lng: number;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocationDetail)
  nearby: LocationDetail;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocationDetail)
  popular: LocationDetail;
}
@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'key' })
  id: string;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ProductType)
  type: string;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Tag)
  tag: string;

  @Column({ type: 'json', nullable: true })
  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => Investor)
  investor: object;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ type: Number })
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Column({ type: Number })
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  originalPrice: number;

  @Column({ type: 'json' })
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Information)
  information: object;

  @Column({ type: 'json' })
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Policy)
  policy: object;

  @Column({ type: 'json' })
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Description)
  description: object;

  @Column({ type: 'json' })
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Location)
  location: object;

  @Column({ type: Number, default: 0 })
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  view: number;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  thumbnail: string;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Status)
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export const createProductDTO = [
  'type',
  'tag',
  'investor',
  'name',
  'price',
  'originalPrice',
  'information',
  'policy',
  'description',
  'location',
  'view',
  'thumbnail',
  'status',
] as const;
