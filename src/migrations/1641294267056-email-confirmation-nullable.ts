import { MigrationInterface, QueryRunner } from "typeorm";

export class emailConfirmationNullable1641294267056
  implements MigrationInterface
{
  name = "emailConfirmationNullable1641294267056";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "emailConfirmationToken" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP EXTENSION IF EXISTS "uuid-ossp"; ALTER TABLE "user" ALTER COLUMN "emailConfirmationToken" SET NOT NULL`
    );
  }
}
