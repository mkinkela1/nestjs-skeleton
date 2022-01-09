import { Entity, Column } from "typeorm";
import { BaseEntity } from "src/entities/base.entity";

@Entity({ name: "user" })
export class User extends BaseEntity {
  @Column({ type: "varchar", length: 300, unique: true })
  email: string;

  @Column({ type: "varchar", length: 300 })
  password: string;

  @Column({ type: "uuid", nullable: true })
  emailConfirmationToken: string;

  @Column({ type: "varchar", nullable: true })
  passwordResetToken: string;
}
