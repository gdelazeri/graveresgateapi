import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';
import ChecklistType from '../enum/checklist/ChecklistType';

@Entity('checklist')
export class Checklist {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false, enum: ChecklistType })
  type: ChecklistType;

  @Column({ nullable: false })
  name: string;
}
