import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
} from 'typeorm';
import DutyShift from '../enum/duty/DutyShift';

@Entity('duty_request')
export class DutyRequest {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  date: string;

  @Column({ nullable: false, enum: DutyShift })
  shift: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  startAt: Date;

  @Column({ nullable: false })
  endAt: Date;

  @Column({ nullable: true })
  note: string;

  @Column({ nullable: true })
  deletedAt: Date;

  @Column({ nullable: true })
  deletedBy: string;

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;
}