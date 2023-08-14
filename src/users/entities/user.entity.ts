import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
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
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsExist } from 'src/decorators/isExist.decorator';
import { RolesEnum } from 'src/guards/role.guards';
import {
  ApiPropertyEmail,
  ApiPropertyEnum,
} from 'src/decorators/swagger.decorator';

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
  @IsString()
  name: string;

  @Column({ type: String, unique: true })
  @ApiPropertyEmail()
  @IsNotEmpty()
  @IsEmail()
  @IsUnique(User)
  email: string;

  @Column({ type: String })
  @Exclude({ toPlainOnly: true })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Column({ type: String, nullable: true })
  @ApiPropertyEnum(Gender)
  @IsOptional()
  @IsEnum(Gender)
  gender: string;

  @Column({ type: String, unique: true, nullable: true })
  @ApiPropertyOptional()
  @IsOptional()
  @Matches(Helper.regex.phoneNumber, {
    message: 'phoneNumber must be a valid phone number',
  })
  @IsUnique(User)
  phoneNumber: string;

  @Column({ type: Date, nullable: true })
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  dateOfBirth: Date;

  @Column({ type: 'uuid' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  @IsExist(Role)
  roleId: string;

  @ManyToOne(() => Role, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ update: true })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  async setDefaultRole() {
    if (!this.roleId)
      this.roleId = (await Role.findOneBy({ name: RolesEnum.USER })).id;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
export const queryUserDTO = [
  'name',
  'email',
  'gender',
  'phoneNumber',
  'roleId',
] as const;

export const createUserDTO = [
  ...queryUserDTO,
  'dateOfBirth',
  'password',
] as const;

export const loginUserDTO = ['email', 'password'] as const;
