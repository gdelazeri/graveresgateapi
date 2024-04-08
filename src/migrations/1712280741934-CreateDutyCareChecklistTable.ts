import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDutyCareChecklistTable1712280741934 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'dutyCareChecklist',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'checklistFilledId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'vehicleId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'dutyId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'time',
            type: 'time',
            isNullable: false,
          },
          {
            name: 'note',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'addressNeighborhood',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'addressCity',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'victimName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'victimGender',
            type: 'char',
            isNullable: false,
          },
          {
            name: 'victimDocument',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'victimAge',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'victimPhone',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'victimAddress',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'victimAddressNeighborhood',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'victimAddressCity',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'victimDestination',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'victimState',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'victimSituation',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'arrivalTime',
            type: 'time',
            isNullable: false,
          },
          {
            name: 'incidentContinuation',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'serviceEvolution',
            type: 'varchar',
            isNullable: false,
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
          { columnNames: ['createdByUserId'], referencedTableName: 'user', referencedColumnNames: ['id'] },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('dutyCareChecklist');
  }
}
