import { Exclude } from 'class-transformer';
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
  id: string;

  @Column({ type: String })
  name: string;

  @Column({ type: String, unique: true })
  email: string;

  @Column({ type: String })
  @Exclude({ toPlainOnly: true })
  password: string;

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
