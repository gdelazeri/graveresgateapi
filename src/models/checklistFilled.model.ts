import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';

@Entity('checklistFilled')
export class ChecklistFilled {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  checklistId: string;
}
