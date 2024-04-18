import { MigrationInterface, QueryRunner } from 'typeorm';
import DutyPosition from '../enum/duty/DutyPosition';

export class UpdateDutyRequestPositionEnum1711133955603
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "dutyRequestPosition_position_enum" ADD VALUE '${DutyPosition.ASSISTANT_RADIO_OPERATOR}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
