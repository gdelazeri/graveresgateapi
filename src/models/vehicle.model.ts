import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
} from 'typeorm';

@Entity('vehicle')
export class Vehicle {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  licensePlate: string;

  @Column({ nullable: true })
  deletedAt: Date;

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;
}