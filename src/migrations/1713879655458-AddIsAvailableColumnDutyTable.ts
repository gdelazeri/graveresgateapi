import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsAvailableColumnDutyTable1713879655458 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "duty" ADD COLUMN "isAvailable" BOOLEAN NOT NULL DEFAULT true');
    await queryRunner.query('ALTER TABLE "duty" ADD COLUMN "note" VARCHAR');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "duty" DROP COLUMN "isAvailable"');
    await queryRunner.query('ALTER TABLE "duty" DROP COLUMN "note"');
  }
}
