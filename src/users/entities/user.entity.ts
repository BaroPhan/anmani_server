import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { Role } from 'src/roles/entities/role.entity';
import { Helper } from 'src/utils/helper.utils';
import { IsUnique } from 'src/decorators/isUnique.decorator';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsExist } from 'src/decorators/isExist.decorator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'key' })
  id: string;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @Column({ type: String, unique: true })
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsUnique(User)
  email: string;

  @Column({ type: String })
  @Exclude({ toPlainOnly: true })
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @Column({ type: String })
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: string;

  @Column({ type: String, unique: true })
  @ApiProperty()
  @IsNotEmpty()
  @Matches(Helper.regex.phoneNumber)
  @IsUnique(User)
  phoneNumber: string;

  @Column({ type: Date })
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date;

  @ManyToOne(() => Role, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: Role })
  @IsNotEmpty()
  @IsExist(Role)
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ update: true })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}

export const createUserDTO = [
  'name',
  'email',
  'password',
  'gender',
  'phoneNumber',
  'dateOfBirth',
  'role',
] as readonly (keyof User)[];

export const loginUserDTO = ['email', 'password'] as readonly (keyof User)[];
