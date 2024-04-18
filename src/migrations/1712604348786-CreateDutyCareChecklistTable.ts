import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import DutyCareChecklistIncidentContinuation from '../enum/dutyCareChecklist/DutyCareChecklistIncidentContinuation';

export class CreateDutyCareChecklistTable1712604348786
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE incident_continuation
      AS ENUM ('${DutyCareChecklistIncidentContinuation.REMOVAL}', '${DutyCareChecklistIncidentContinuation.REFUSED}');
    `);
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
            name: 'dutyId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'note',
            type: 'varchar',
            isNullable: true,
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
            name: 'vehicleId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'reason',
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
            name: 'victimAge',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'victimDocument',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'incidentAddress',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'incidentAddressDistrict',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'incidentAddressCity',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'incidentContinuation',
            type: 'incident_continuation',
            isNullable: false,
          },
          {
            name: 'incidentEvolution',
            type: 'varchar',
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
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['vehicleId'],
            referencedTableName: 'vehicle',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['createdByUserId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['checklistFilledId'],
            referencedTableName: 'checklistFilled',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('dutyCareChecklist');
  }
}
