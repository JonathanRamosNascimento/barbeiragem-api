import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, MaxLength } from 'class-validator';
import { User } from '../user/user.entity';

@Entity()
export class BarberShop {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'varchar' })
  @MaxLength(150, { message: 'Max length is 150' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  @IsEmail(null, { message: 'invalid email' })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'bool', default: true, nullable: true, name: 'is_active' })
  isActive: boolean;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @ManyToMany(() => User)
  @JoinTable()
  barbers: User[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'updated_at',
  })
  updatedAt: Date;
}
