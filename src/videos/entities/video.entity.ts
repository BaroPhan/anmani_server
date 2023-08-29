import { Expose, Type } from 'class-transformer';
import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  In,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import {
  ApiPropertyEnum,
  ApiPropertyURL,
} from 'src/decorators/swagger.decorator';
import { IsExist } from 'src/decorators/isExist.decorator';
import { Product } from 'src/products/entities/product.entity';

enum VideoType {
  VIDEO = 'video',
  IMAGE = 'image',
}
class Stories {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyURL()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiPropertyEnum(VideoType)
  @IsNotEmpty()
  @IsEnum(VideoType)
  type: string;
}
@Entity()
export class Video extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'key' })
  id: string;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column({ type: 'json', nullable: true })
  @ApiProperty({ type: Stories, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Stories)
  stories: Stories[];

  @Column({ type: 'uuid', array: true })
  @ApiProperty()
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(2)
  @IsExist(Product)
  productIds: string[];

  @Expose()
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @AfterLoad()
  async loadProducts(): Promise<void> {
    this.products = await Product.findBy({ id: In(this.productIds) });
  }

  @BeforeInsert()
  async test() {
    console.log(this);
  }
}

export const queryVideoDto = ['title'] as const;
export const createVideoDTO = [
  ...queryVideoDto,
  'stories',
  'productIds',
] as const;
