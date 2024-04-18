import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';

@Entity('course')
export class Course {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;
}
