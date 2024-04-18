import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAvailableColumnVehicleTable1710963385395
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vehicle" ADD COLUMN "isAvailable" BOOLEAN NOT NULL DEFAULT true',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "vehicle" DROP COLUMN "isAvailable"');
  }
}
