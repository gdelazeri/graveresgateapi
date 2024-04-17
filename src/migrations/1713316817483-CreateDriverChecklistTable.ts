import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDriverChecklistTable1713316817483 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'driverChecklist',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'dutyId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'kmInitial',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'vehicleId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'checklistFilledId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'createdByUserId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()'
          },
        ],
        foreignKeys: [
          { columnNames: ['vehicleId'], referencedTableName: 'vehicle', referencedColumnNames: ['id'] },
          { columnNames: ['dutyId'], referencedTableName: 'duty', referencedColumnNames: ['id'] },
          { columnNames: ['createdByUserId'], referencedTableName: 'user', referencedColumnNames: ['id'] },
          { columnNames: ['checklistFilledId'], referencedTableName: 'checklistFilled', referencedColumnNames: ['id'] },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('driverChecklist');
  }

}
