import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import DutyShift from '../enum/duty/DutyShift';

export class CreateDutyRequestTable1708913454347 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'dutyRequest',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'shift',
            type: 'varchar',
            isNullable: false,
            enum: Object.values(DutyShift),
          },
          {
            name: 'userId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'startAt',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'endAt',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'note',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'deletedAt',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'deletedBy',
            type: 'varchar',
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
            columnNames: ['userId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('dutyRequest');
  }
}
