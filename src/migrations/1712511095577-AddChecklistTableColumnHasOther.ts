import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChecklistTableColumnHasOther1712511095577 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "checklistQuestion" ADD COLUMN "hasOtherOption" BOOLEAN NOT NULL DEFAULT false;');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "checklistQuestion" DROP COLUMN "hasOtherOption";');
  }
}
