import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
} from 'typeorm';
import { ChecklistQuestionType } from '../interfaces/Checklist';

@Entity('checklistQuestion')
export class ChecklistQuestion {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  checklistId: string;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: false })
  order: number;

  @Column({ nullable: false })
  type: ChecklistQuestionType;

  @Column({ nullable: false, default: false })
  required: boolean;
}
