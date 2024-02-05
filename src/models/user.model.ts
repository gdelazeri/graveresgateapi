import { Entity, Column, PrimaryColumn, Generated, BeforeInsert, BeforeUpdate } from "typeorm"
import bcrypt from 'bcrypt';
import Permission from "../enum/user/UserPermission"
import Status from "../enum/user/UserStatus"

@Entity("user")
export class User {
  @PrimaryColumn()
  @Generated("uuid")
  id: string

  @Column({ nullable: true })
  registrationId: string

  @Column({ nullable: false })
  name: string

  @Column({ unique: true, nullable: false })
  email: string

  @Column({ nullable: false })
  phone: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: false, enum: Permission, default: Permission.TRAINEE })
  permission: Permission = Permission.TRAINEE

  @Column({ nullable: false, enum: Status, default: Status.PENDING })
  status: Status = Status.PENDING

  @Column({ nullable: false, default: false })
  isDriver: boolean = false

  @Column({ nullable: true })
  imageUrl: string

  @Column({ nullable: true })
  deletedAt: Date

  @Column({ nullable: true })
  deletedBy: string

  @Column({ nullable: true, default: new Date() })
  createdAt: Date = new Date()

  @BeforeInsert()
  hashPasswordInsert(): void {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
  }
}
