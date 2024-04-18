import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import DutyShift from '../enum/duty/DutyShift';

export class CreateDutyTable1710122109904 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'duty',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'date',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'shift',
            type: 'varchar',
            isNullable: false,
            enum: Object.values(DutyShift),
          },
          {
            name: 'leaderId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'driverId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'firstRescuerId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'secondRescuerId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'radioOperatorId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'assistantRadioOperatorId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'traineeId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'date',
            isNullable: false,
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['leaderId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['driverId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['firstRescuerId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['secondRescuerId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['radioOperatorId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['assistantRadioOperatorId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['traineeId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('duty');
  }
}
