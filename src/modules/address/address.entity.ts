import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'numeric', name: 'zip_code' })
  zipCode: number;

  @Column({ type: 'varchar' })
  street: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  state: string;

  @Column({ type: 'varchar' })
  district: string;

  @Column({ type: 'varchar', nullable: true })
  complement: string;
}
