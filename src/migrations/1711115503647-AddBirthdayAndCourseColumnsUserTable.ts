import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBirthdayAndCourseColumnsUserTable1711115503647
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ADD COLUMN "birthDate" DATE');
    await queryRunner.query(
      'ALTER TABLE "user" ADD COLUMN "courseEdition" INT',
    );
    await queryRunner.query('ALTER TABLE "user" ADD COLUMN "approvedBy" UUID');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "birthDate"');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "courseEdition"');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "approvedBy"');
  }
}
