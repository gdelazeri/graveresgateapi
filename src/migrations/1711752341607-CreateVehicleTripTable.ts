import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVehicleTripTable1711752341607 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vehicleTrip',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'vehicleId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'driverId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'kmInitial',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'kmFinal',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'startAt',
            type: 'time',
            isNullable: false,
          },
          {
            name: 'endAt',
            type: 'time',
            isNullable: false,
          },
          {
            name: 'place',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'reason',
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
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['driverId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vehicleTrip');
  }
}
