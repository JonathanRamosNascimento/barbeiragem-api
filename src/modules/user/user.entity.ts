import { IsEmail, MaxLength } from 'class-validator';
import { Address } from 'src/modules/address/address.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({ type: 'numeric' })
  phone: number;

  @Column({ type: 'varchar' })
  profile: string;

  @Column({ type: 'bool', default: true, nullable: true })
  isActive: boolean;

  @OneToOne(() => Address, (address) => address.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;
}
