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

@Entity('dutyCareChecklist')
export class DutyCareChecklist {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  checklistFilledId: string;

  @Column({ nullable: false })
  vehicleId: string;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.id)
  @JoinColumn()
  vehicle: Relation<Vehicle>

  @Column({ nullable: false })
  dutyId: string;
  
  @Column({ nullable: false })
  date: string;
  
  @Column({ nullable: false })
  time: string;
  
  @Column({ nullable: false })
  note: string;
  
  @Column({ nullable: false })
  address: string;
  
  @Column({ nullable: false })
  assistantRadioOperatorId: string;
  
  @Column({ nullable: false })
  addressNeighborhood: string;
  
  @Column({ nullable: false })
  addressCity: string;
  
  @Column({ nullable: false })
  victimName: string

  @Column({ nullable: false })
  victimGender: string

  @Column({ nullable: false })
  victimDocument: string

  @Column({ nullable: false })
  victimAge: string

  @Column({ nullable: false })
  victimPhone: string

  @Column({ nullable: false })
  victimAddress: string

  @Column({ nullable: false })
  victimAddressNeighborhood: string

  @Column({ nullable: false })
  victimAddressCity: string

  @Column({ nullable: false })
  victimDestination: string

  @Column({ nullable: false })
  victimState: string

  @Column({ nullable: false })
  victimSituation: string

  @Column({ nullable: false })
  arrivalTime: string

  @Column({ nullable: false })
  incidentContinuation: string

  @Column({ nullable: false })
  serviceEvolution: string

  @Column({ nullable: false })
  createdByUserId: string

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  createdByUser: Relation<User>

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;
}