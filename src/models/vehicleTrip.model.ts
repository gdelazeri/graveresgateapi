import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
} from 'typeorm';

@Entity('vehicleTrip')
export class VehicleTrip {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  vehicleId: string

  @Column({ nullable: false })
  driverId: string

  @Column({ nullable: false })
  date: string

  @Column({ nullable: false })
  kmInitial: string

  @Column({ nullable: false })
  kmFinal: string

  @Column({ nullable: false })
  startAt: string

  @Column({ nullable: false })
  endAt: string

  @Column({ nullable: false })
  place: string

  @Column({ nullable: false })
  reason: string

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;
}