import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
} from "typeorm";
import { v4 } from "uuid";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "boolean", default: false })
  isActive: boolean;

  @Column({ type: "boolean", default: false })
  isArchived: boolean;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createDateTime: Date;

  @Column({ type: "varchar", length: 300, nullable: true })
  createdBy: string;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  lastChangedDateTime: Date;

  @Column({ type: "varchar", length: 300, nullable: true })
  lastChangedBy: string;

  @Column({ type: "varchar", length: 300, nullable: true })
  internalComment: string | null;

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
