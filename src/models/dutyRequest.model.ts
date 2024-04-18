import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';
import DutyShift from '../enum/duty/DutyShift';

@Entity('dutyRequest')
export class DutyRequest {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  date: string;

  @Column({ nullable: false, enum: DutyShift })
  shift: DutyShift;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  startAt: string;

  @Column({ nullable: false })
  endAt: string;

  @Column({ nullable: true })
  note: string;

  @Column({ nullable: true })
  deletedAt: Date;

  @Column({ nullable: true })
  deletedBy: string;

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;
}
