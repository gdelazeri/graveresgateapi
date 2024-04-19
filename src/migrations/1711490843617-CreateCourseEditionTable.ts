import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCourseEditionTable1711490843617
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'course',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
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
    await queryRunner.query(
      'ALTER TABLE "user" ADD CONSTRAINT fk_user_course FOREIGN KEY ("courseId") REFERENCES "course" (id);',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('course');
  }
}
