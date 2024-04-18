import { MigrationInterface, QueryRunner } from 'typeorm';
import DutyShift from '../enum/duty/DutyShift';

export class AlterDutyTableColumn1710124685627 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "duty" ALTER COLUMN "date" TYPE date USING "date"::date',
    );
    await queryRunner.query(
      'ALTER TABLE "duty" ALTER COLUMN "shift" TYPE duty_shift USING shift::text::duty_shift',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "duty" ALTER COLUMN "date" TYPE varchar USING "date"::varchar',
    );
    await queryRunner.query(
      'ALTER TABLE "duty" ALTER COLUMN "shift" TYPE varchar USING shift::text::varchar',
    );
  }
}
