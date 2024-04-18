import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';

@Entity('checklistQuestionItem')
export class ChecklistQuestionItem {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  checklistQuestionId: string;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: false })
  order: number;
}
