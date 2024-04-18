import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
  OneToOne,
  JoinColumn,
  Relation,
} from 'typeorm';
import { User } from './user.model';
import { Vehicle } from './vehicle.model';
import { Duty } from './duty.model';

@Entity('driverChecklist')
export class DriverChecklist {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  dutyId: string;

  @OneToOne(() => Duty, duty => duty.id)
  @JoinColumn()
  duty: Relation<Vehicle>;

  @Column({ nullable: false })
  kmInitial: string;

  @Column({ nullable: false })
  vehicleId: string;

  @OneToOne(() => Vehicle, vehicle => vehicle.id)
  @JoinColumn()
  vehicle: Relation<Vehicle>;

  @Column({ nullable: true })
  checklistFilledId: string;

  @Column({ nullable: false })
  createdByUserId: string;

  @OneToOne(() => User, user => user.id)
  @JoinColumn()
  createdByUser: Relation<User>;

  @Column({ nullable: false, default: new Date() })
  createdAt: string;
}
