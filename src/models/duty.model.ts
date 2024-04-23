import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';
import DutyShift from '../enum/duty/DutyShift';

@Entity('duty')
export class Duty {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  date: string;

  @Column({ nullable: false, enum: DutyShift })
  shift: DutyShift;

  @Column({ nullable: false })
  leaderId: string;

  @Column({ nullable: false })
  driverId: string;

  @Column({ nullable: false })
  firstRescuerId: string;

  @Column({ nullable: false })
  secondRescuerId: string;

  @Column({ nullable: false })
  radioOperatorId: string;

  @Column({ nullable: false })
  assistantRadioOperatorId: string;

  @Column({ nullable: false })
  traineeId: string;

  @Column({ nullable: false, default: true })
  isAvailable: string;

  @Column({ nullable: false, default: true })
  note: string;

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;
}
