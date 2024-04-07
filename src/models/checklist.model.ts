import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
} from 'typeorm';
import { ChecklistType } from '../interfaces/Checklist';

@Entity('checklist')
export class Checklist {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false, enum: ChecklistType })
  name: ChecklistType;
}