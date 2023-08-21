import { Expose, Type } from 'class-transformer';
import {
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
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import {
  ApiPropertyEnum,
  ApiPropertyURL,
} from 'src/decorators/swagger.decorator';

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

  @Column({ type: String })
  @ApiPropertyURL()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @Column({ type: 'json', nullable: true })
  @ApiProperty({ type: Stories, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Stories)
  stories: Stories[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export const queryVideoDto = ['title', 'url'] as const;
export const createVideoDTO = [...queryVideoDto, 'stories'] as const;
