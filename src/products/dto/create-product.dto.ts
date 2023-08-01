/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
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

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ProductType)
  type: ProductType;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Tag)
  tag: Tag;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => Investor)
  investor?: Investor[];

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  originalPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Information)
  information: Information;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Policy)
  policy: Policy;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Description)
  description: Description;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Location)
  location: Location;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  view: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  thumbnail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}
