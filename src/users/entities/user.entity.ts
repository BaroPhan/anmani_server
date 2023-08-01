import { Exclude, Expose } from 'class-transformer';
import { Role } from 'src/roles/entities/role.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'key' })
  id: string;

  @Column({ type: String })
  name: string;

  @Column({ type: String, unique: true })
  email: string;

  @Column({ type: String })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ type: String })
  gender: string;

  @Column({ type: String, unique: true })
  phoneNumber: string;

  @Column({ type: Date })
  dateOfBirth: Date;

  @ManyToOne(() => Role, {
    eager: true,
    onDelete: 'CASCADE',
  })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
