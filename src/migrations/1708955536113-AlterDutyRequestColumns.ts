import { MigrationInterface, QueryRunner } from 'typeorm';
import DutyShift from '../enum/duty/DutyShift';

export class AlterDutyRequestColumns1708955536113
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE duty_shift AS ENUM ('${DutyShift.DAY}', '${DutyShift.NIGHT}')`,
    );
    await queryRunner.query(
      'ALTER TABLE "dutyRequest" ALTER COLUMN shift TYPE duty_shift USING shift::text::duty_shift',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "dutyRequest" ALTER COLUMN shift TYPE varchar USING shift::varchar',
    );
  }
}
