import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
  OneToOne,
  Relation,
  JoinColumn,
} from 'typeorm';
import { User } from './user.model';
import { Vehicle } from './vehicle.model';
import { Duty } from './duty.model';
import DutyCareChecklistIncidentContinuation from '../enum/dutyCareChecklist/DutyCareChecklistIncidentContinuation';

@Entity('dutyCareChecklist')
export class DutyCareChecklist {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  dutyId: string;

  @OneToOne(() => Duty, duty => duty.id)
  @JoinColumn()
  duty: Duty;

  @Column({ nullable: true })
  note?: string;

  @Column({ nullable: false })
  date: string;

  @Column({ nullable: false })
  time: string;

  @Column({ nullable: false })
  vehicleId: string;

  @OneToOne(() => Vehicle, vehicle => vehicle.id)
  @JoinColumn()
  vehicle: Relation<Vehicle>;

  @Column({ nullable: false })
  reason: string;

  @Column({ nullable: false })
  victimName: string;

  @Column({ nullable: false })
  victimGender: string;

  @Column({ nullable: false })
  victimAge: number;

  @Column({ nullable: true })
  victimDocument: string;

  @Column({ nullable: false })
  incidentAddress: string;

  @Column({ nullable: false })
  incidentAddressDistrict: string;

  @Column({ nullable: false })
  incidentAddressCity: string;

  @Column({ nullable: false, enum: DutyCareChecklistIncidentContinuation })
  incidentContinuation: DutyCareChecklistIncidentContinuation;

  @Column({ nullable: false })
  incidentEvolution: string;

  @Column({ nullable: false })
  checklistFilledId: string;

  @Column({ nullable: false })
  createdByUserId: string;

  @OneToOne(() => User, user => user.id)
  @JoinColumn()
  createdByUser: Relation<User>;

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;
}
