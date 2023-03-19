import { IsEmail, MaxLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from '../address/address.entity';

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

  @OneToOne(() => Address, (address) => address.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @ManyToMany(() => User, (user) => user.barberShops)
  @JoinTable({
    name: 'barbers',
    joinColumn: { name: 'barber_shop_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
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
