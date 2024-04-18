import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';

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
  checklistQuestion: string;

  @Column({ nullable: true })
  checklistQuestionItem?: string;

  @Column({ nullable: false })
  checklistQuestionOption: string;
}
