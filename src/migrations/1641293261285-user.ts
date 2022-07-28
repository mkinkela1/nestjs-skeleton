import { MigrationInterface, QueryRunner } from "typeorm";

export class user1641293261285 implements MigrationInterface {
  name = "user1641293261285";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA public; CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT false, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300), "internalComment" character varying(300), "email" character varying(300) NOT NULL, "password" character varying(300) NOT NULL, "emailConfirmationToken" uuid NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP EXTENSION IF EXISTS "uuid-ossp"; DROP TABLE "user"`
    );
  }
}
