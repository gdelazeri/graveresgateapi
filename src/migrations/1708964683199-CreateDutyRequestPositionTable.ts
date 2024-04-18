import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import DutyPosition from '../enum/duty/DutyPosition';

export class CreateDutyRequestPositionTable1708964683199
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'dutyRequestPosition',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'dutyRequestId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'position',
            type: 'enum',
            isNullable: false,
            enum: Object.values(DutyPosition),
          },
        ],
        foreignKeys: [
          {
            columnNames: ['dutyRequestId'],
            referencedTableName: 'dutyRequest',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('dutyRequestPosition');
  }
}
