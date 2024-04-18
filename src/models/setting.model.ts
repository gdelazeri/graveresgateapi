import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';

@Entity('settings')
export class Setting {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  key: string;

  @Column('jsonb', { nullable: true })
  value: object | object[];

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;
}
