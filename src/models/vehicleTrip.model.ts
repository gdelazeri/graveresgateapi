import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
  Relation,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.model';
import { Vehicle } from './vehicle.model';

@Entity('vehicleTrip')
export class VehicleTrip {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  vehicleId: string;

  @OneToOne(() => Vehicle, vehicle => vehicle.id)
  @JoinColumn()
  vehicle: Vehicle;

  @Column({ nullable: false })
  driverId: string;

  @OneToOne(() => User, user => user.id)
  @JoinColumn()
  driver: User;

  @Column({ nullable: false })
  date: string;

  @Column({ nullable: false })
  kmInitial: string;

  @Column({ nullable: false })
  kmFinal: string;

  @Column({ nullable: false })
  startAt: string;

  @Column({ nullable: false })
  endAt: string;

  @Column({ nullable: false })
  place: string;

  @Column({ nullable: false })
  reason: string;

  @Column({ nullable: false })
  createdByUserId: string;

  @OneToOne(() => User, user => user.id)
  @JoinColumn()
  createdByUser: Relation<User>;

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;
}
