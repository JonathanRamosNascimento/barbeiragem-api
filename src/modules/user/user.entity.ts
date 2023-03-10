import { IsEmail, MaxLength } from 'class-validator';
import { Address } from 'src/modules/address/address.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BarberShop } from '../barber-shop/barber-shop.entity';

export enum UserRole {
  CLIENT = 'client',
  PROFESSIONAL = 'professional',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'varchar' })
  @MaxLength(150, { message: 'Max length is 150' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  @IsEmail(null, { message: 'invalid email' })
  email: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @Column({ type: 'bool', default: true, nullable: true, name: 'is_active' })
  isActive: boolean;

  @OneToOne(() => Address, (address) => address.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @ManyToMany(() => BarberShop, (barberShop) => barberShop.barbers)
  barberShops: BarberShop[];

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
