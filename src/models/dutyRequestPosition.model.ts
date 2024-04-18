import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';
import DutyPosition from '../enum/duty/DutyPosition';

@Entity('dutyRequestPosition')
export class DutyRequestPosition {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  dutyRequestId: string;

  @Column({ nullable: false, enum: DutyPosition })
  position: DutyPosition;
}
