import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateChecklistTableNameEnum1712510343244 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("CREATE TYPE checklist_type AS ENUM ('DUTY_CARE', 'DRIVER', 'RESCUER', 'RADIO_OPERATOR');")
    await queryRunner.query('ALTER TABLE "checklist" ALTER COLUMN type TYPE checklist_type USING type::text::checklist_type');
    await queryRunner.query('ALTER TABLE "checklist" ADD UNIQUE (type);');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "checklist" ALTER COLUMN "type" TYPE varchar USING "type"::varchar;');
    await queryRunner.query("DROP TYPE checklist_type;")
  }
}
