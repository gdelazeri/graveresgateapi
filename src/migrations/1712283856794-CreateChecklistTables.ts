import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import ChecklistQuestionType from '../enum/checklist/ChecklistQuestionType';
import ChecklistType from '../enum/checklist/ChecklistType';

export class CreateChecklistTables1712283856794 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE checklist_type AS ENUM ('${ChecklistType.DUTY_CARE}', '${ChecklistType.DRIVER}', '${ChecklistType.RESCUER}', '${ChecklistType.RADIO_OPERATOR}');`,
    );
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
            type: 'checklist_type',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
        ],
        foreignKeys: [],
      }),
    );
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
          },
        ],
        foreignKeys: [
          {
            columnNames: ['checklistId'],
            referencedTableName: 'checklist',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
    await queryRunner.query(
      `CREATE TYPE question_type AS ENUM ('${ChecklistQuestionType.TEXT}', '${ChecklistQuestionType.OPTION}', '${ChecklistQuestionType.SELECT}');`,
    );
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
            type: 'question_type',
            isNullable: false,
          },
          {
            name: 'hasOtherOption',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'required',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'multiple',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['checklistId'],
            referencedTableName: 'checklist',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
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
          {
            columnNames: ['checklistQuestionId'],
            referencedTableName: 'checklistQuestion',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
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
          {
            columnNames: ['checklistQuestionId'],
            referencedTableName: 'checklistQuestion',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'checklistFilledAnswer',
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
            name: 'checklistQuestionId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'checklistQuestion',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'checklistQuestionItem',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'checklistQuestionOption',
            type: 'varchar',
            isNullable: false,
          },
        ],
        foreignKeys: [
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
    await queryRunner.dropTable('checklist');
    await queryRunner.dropTable('checklistFilled');
    await queryRunner.dropTable('checklistQuestion');
    await queryRunner.dropTable('checklistQuestionItem');
    await queryRunner.dropTable('checklistQuestionOption');
    await queryRunner.dropTable('checklistFilledAnswer');
  }
}
