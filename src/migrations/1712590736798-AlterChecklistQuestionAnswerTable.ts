import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterChecklistQuestionAnswerTable1712590736798 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "checklistFilledAnswer" ALTER COLUMN "checklistQuestionItemId" DROP NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "checklistFilledAnswer" ALTER COLUMN "checklistQuestionItemId" SET NOT NULL;');
  }
}
