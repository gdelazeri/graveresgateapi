import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateChecklistTables1712283856794 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'checklist',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
          }
        ],
        foreignKeys: [],
      }),
    )
    await queryRunner.createTable(
      new Table({
        name: 'checklistFilled',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'checklistId',
            type: 'uuid',
            isNullable: false,
          }
        ],
        foreignKeys: [
          { columnNames: ['checklistId'], referencedTableName: 'checklist', referencedColumnNames: ['id'] },
        ],
      }),
    )
    await queryRunner.query('ALTER TABLE "dutyCareChecklist" ADD CONSTRAINT fk_checklist_filled FOREIGN KEY ("checklistFilledId") REFERENCES "checklistFilled" (id);');
    await queryRunner.query("CREATE TYPE QuestionType AS ENUM ('TEXT', 'OPTION');")
    await queryRunner.createTable(
      new Table({
        name: 'checklistQuestion',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'checklistId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'text',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'order',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'QuestionType',
            isNullable: false,
          }
        ],
        foreignKeys: [
          { columnNames: ['checklistId'], referencedTableName: 'checklist', referencedColumnNames: ['id'] },
        ],
      }),
    )
    await queryRunner.createTable(
      new Table({
        name: 'checklistQuestionItem',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'checklistQuestionId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'text',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'order',
            type: 'int',
            isNullable: false,
          },
        ],
        foreignKeys: [
          { columnNames: ['checklistQuestionId'], referencedTableName: 'checklistQuestion', referencedColumnNames: ['id'] },
        ],
      }),
    )
    await queryRunner.createTable(
      new Table({
        name: 'checklistQuestionOption',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'checklistQuestionId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'text',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'order',
            type: 'int',
            isNullable: false,
          },
        ],
        foreignKeys: [
          { columnNames: ['checklistQuestionId'], referencedTableName: 'checklistQuestion', referencedColumnNames: ['id'] },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('checklist')
    await queryRunner.dropTable('checklistFilled')
    await queryRunner.dropTable('checklistQuestion')
    await queryRunner.dropTable('checklistQuestionItem')
    await queryRunner.dropTable('checklistQuestionOption')
  }
}
