import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTimeDutyRequestTable1709840694000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "dutyRequest" ALTER COLUMN "startAt" TYPE time USING "startAt"::time;',
    );
    await queryRunner.query(
      'ALTER TABLE "dutyRequest" ALTER COLUMN "endAt" TYPE time USING "endAt"::time;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "dutyRequest" ALTER COLUMN "startAt" TYPE timestamp USING "startAt"::timestamp;',
    );
    await queryRunner.query(
      'ALTER TABLE "dutyRequest" ALTER COLUMN "endAt" TYPE timestamp USING "endAt"::timestamp;',
    );
  }
}
