import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateChecklistTableNameEnum1712510343244 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("CREATE TYPE checklist_name AS ENUM ('DUTY_CARE', 'DRIVER', 'RESCUER', 'RADIO_OPERATOR');")
    await queryRunner.query('ALTER TABLE "checklist" ALTER COLUMN name TYPE checklist_name USING name::text::checklist_name');
    await queryRunner.query('ALTER TABLE "checklist" ADD UNIQUE (name);');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "checklist" ALTER COLUMN "name" TYPE varchar USING "name"::varchar;');
    await queryRunner.query("DROP TYPE checklist_name;")
  }
}
