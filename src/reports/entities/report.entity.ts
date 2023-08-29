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
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiPropertyURL } from 'src/decorators/swagger.decorator';

@Entity()
export class Report extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'key' })
  id: string;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ type: String })
  @ApiPropertyURL()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export const queryReportDTO = ['name'] as const;
export const createReportDTO = [...queryReportDTO, 'url'] as const;
