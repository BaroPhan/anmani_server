import { Exclude, Expose } from 'class-transformer';
import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  In,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { IsExist } from 'src/decorators/isExist.decorator';

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
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @Column({ type: 'json', nullable: true })
  @Exclude({ toClassOnly: true })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsExist(Video)
  stories: string[];

  @OneToMany(() => Video, (video) => video.stories)
  @Expose({ name: 'stories' })
  children: Video[];

  @AfterLoad()
  async loadChildren(): Promise<void> {
    if (this.stories && this.stories.length > 0) {
      this.children = await Video.findBy({ id: In(this.stories) });
    }
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export const queryVideoDto = ['title', 'url'] as const;
export const createVideoDTO = [...queryVideoDto, 'stories'] as const;
