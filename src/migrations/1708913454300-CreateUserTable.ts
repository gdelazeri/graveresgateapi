import { MigrationInterface, QueryRunner, Table } from "typeorm";
import Permission from "../enum/user/UserPermission";
import Status from "../enum/user/UserStatus";

export class CreateUserTable1708913454300 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE user_permission AS ENUM ('${Permission.TRAINEE}', '${Permission.ASSISTANT_RADIO_OPERATOR}', '${Permission.ADMIN}', '${Permission.VOLUNTARY}')`,
    );
    await queryRunner.query(
      `CREATE TYPE user_status AS ENUM ('${Status.ACTIVE}', '${Status.DELETED}', '${Status.PENDING}', '${Status.SUSPENDED}')`
    );

    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'registrationId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'permission',
            type: 'user_permission',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'user_status',
            isNullable: false,
          },
          {
            name: 'isDriver',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'isLeader',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'imageUrl',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'birthDate',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'approvedBy',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'courseId',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'deletedBy',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }

}
