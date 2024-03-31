import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterVehicleTripColumnTable1711851511352 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "vehicleTrip" RENAME COLUMN "startTime" TO "startAt";`);
    await queryRunner.query(`ALTER TABLE "vehicleTrip" RENAME COLUMN "endTime" TO "endAt";`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "vehicleTrip" RENAME COLUMN "startAt" TO "startTime";`);
    await queryRunner.query(`ALTER TABLE "vehicleTrip" RENAME COLUMN "endAt" TO "endTime";`);
  }
}
