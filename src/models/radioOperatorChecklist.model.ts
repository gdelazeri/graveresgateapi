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

@Entity('radioOperatorChecklist')
export class RadioOperatorChecklist {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  dutyId: string;

  @OneToOne(() => Duty, duty => duty.id)
  @JoinColumn()
  duty: Relation<Vehicle>;

  @Column({ nullable: true })
  note: string;

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
