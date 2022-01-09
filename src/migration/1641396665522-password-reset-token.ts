import {MigrationInterface, QueryRunner} from "typeorm";

export class passwordResetToken1641396665522 implements MigrationInterface {
    name = 'passwordResetToken1641396665522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "passwordResetToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passwordResetToken"`);
    }

}
