import { MigrationInterface, QueryRunner } from "typeorm";

export class userFirstAndLastName1656067571523 implements MigrationInterface {
  name = "userFirstAndLastName1656067571523";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user"
                ADD COLUMN "firstName" VARCHAR NULL,
                ADD COLUMN "lastName" VARCHAR NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "user"
            DROP COLUMN "firstName",
            DROP COLUMN "lastName"
    `);
  }
}
