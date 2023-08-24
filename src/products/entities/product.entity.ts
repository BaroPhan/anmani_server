/* eslint-disable max-classes-per-file */
import { Expose } from 'class-transformer';
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
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsUrlArray } from 'src/decorators/isURLArray.decorator';
import {
  ApiPropertyEnum,
  ApiPropertyURL,
  ApiPropertyURLArray,
} from 'src/decorators/swagger.decorator';
import { ProductVariables } from 'src/config/configs/product.config';

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
const productVariables = new ProductVariables();
class Investor {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiPropertyURL(productVariables.DEFAULT_INVESTOR_LOGO)
  @IsNotEmpty()
  @IsUrl()
  logo = productVariables.DEFAULT_INVESTOR_LOGO;
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
class DescriptionDelivery {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  info: string;
}
class Description {
  @ApiProperty()
  @IsNotEmpty()
  pros: string;

  @ApiPropertyOptional()
  @IsOptional()
  cons: string;

  @ApiProperty()
  @IsNotEmpty()
  juridice: string;

  @ApiProperty({ type: DescriptionDelivery })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DescriptionDelivery)
  delivery: DescriptionDelivery;
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

  @ApiProperty({ type: LocationDetail, isArray: true })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => LocationDetail)
  nearby: LocationDetail[];

  @ApiProperty({ type: LocationDetail, isArray: true })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => LocationDetail)
  popular: LocationDetail[];
}
class Image {
  @ApiPropertyURL()
  @IsNotEmpty()
  @IsUrl()
  thumbnail: string;

  @ApiPropertyURLArray()
  @IsNotEmpty()
  @IsUrlArray()
  main: string[];

  @ApiPropertyURLArray()
  @IsNotEmpty()
  @IsUrlArray()
  reality: string[];

  @ApiPropertyURLArray()
  @IsNotEmpty()
  @IsUrlArray()
  area: string[];
}
@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'key' })
  id: string;

  @Column({ type: String })
  @ApiPropertyEnum(ProductType)
  @IsNotEmpty()
  @IsEnum(ProductType)
  type: string;

  @Column({ type: String })
  @ApiPropertyEnum(Tag)
  @IsNotEmpty()
  @IsEnum(Tag)
  tag: string;

  @Column({ type: 'json', nullable: true })
  @ApiPropertyOptional({ type: Investor })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => Investor)
  investor: Investor;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ type: 'bigint' })
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @Column({ type: 'bigint' })
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  originalPrice: number;

  @Column({ type: 'json' })
  @ApiProperty({ type: Information })
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Information)
  information: Information;

  @Column({ type: 'json' })
  @ApiProperty({ type: Policy })
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Policy)
  policy: Policy;

  @Column({ type: 'json' })
  @ApiProperty({ type: Description })
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Description)
  description: Description;

  @Column({ type: 'json' })
  @ApiProperty({ type: Location })
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Location)
  location: Location;

  @Column({ type: Number, default: 0 })
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  view: number;

  @Column({ type: 'json' })
  @ApiProperty({ type: Image })
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Image)
  image: Image;

  @Column({ type: String })
  @ApiPropertyEnum(Status)
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @AfterLoad()
  async loadPrice(): Promise<void> {
    if (this.price) this.price = Number(this.price);
    if (this.originalPrice) this.originalPrice = Number(this.originalPrice);
  }
}

export const queryProductDTO = [
  'type',
  'tag',
  'name',
  'view',
  'status',
] as const;

export const sortProductDTO = [...queryProductDTO, 'price'] as const;

export const createProductDTO = [
  ...queryProductDTO,
  'investor',
  'price',
  'originalPrice',
  'information',
  'policy',
  'description',
  'location',
  'image',
] as const;
