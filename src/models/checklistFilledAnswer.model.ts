import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
} from 'typeorm';

@Entity('checklistFilledAnswer')
export class ChecklistFilledAnswer {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  checklistFilledId: string;

  @Column({ nullable: false })
  checklistQuestionId: string;

  @Column({ nullable: true })
  checklistQuestionItemId?: string;

  @Column({ nullable: true })
  checklistQuestionItemValue?: string;

  @Column({ nullable: false })
  checklistQuestionOptionId?: string;

  @Column({ nullable: false })
  checklistQuestionOptionValue: string;
}
