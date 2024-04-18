import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsLeaderColumnUserTable1709833576725
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user" ADD COLUMN "isLeader" BOOLEAN NOT NULL DEFAULT false',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "isLeader"');
  }
}
