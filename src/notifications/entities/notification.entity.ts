import { Expose } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID, IsUrl } from 'class-validator';
import { IsExist } from 'src/decorators/isExist.decorator';

enum Type {
  UPDATE = 'update',
  INFO = 'info',
}
@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'key' })
  id: string;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Type)
  type: string;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  avatar: string;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  @IsExist(User)
  userId: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export const createNotificationDTO = [
  'type',
  'avatar',
  'title',
  'content',
  'userId',
] as const;
