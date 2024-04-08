import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChecklistQuestionColumnRequired1712593701291 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "checklistQuestion" ADD "required" BOOLEAN NOT NULL DEFAULT false');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "checklistQuestion" DROP COLUMN "required"');
  }

}
