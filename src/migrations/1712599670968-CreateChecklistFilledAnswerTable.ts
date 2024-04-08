import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateChecklistFilledAnswerTable1712599670968 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
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
            name: 'checklistQuestionItemId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'checklistQuestionItemValue',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'checklistQuestionOptionId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'checklistQuestionOptionValue',
            type: 'varchar',
            isNullable: false,
          }
        ],
        foreignKeys: [
          { columnNames: ['checklistFilledId'], referencedTableName: 'checklistFilled', referencedColumnNames: ['id'] },
          { columnNames: ['checklistQuestionId'], referencedTableName: 'checklistQuestion', referencedColumnNames: ['id'] },
          { columnNames: ['checklistQuestionItemId'], referencedTableName: 'checklistQuestionItem', referencedColumnNames: ['id'] },
          { columnNames: ['checklistQuestionOptionId'], referencedTableName: 'checklistQuestionOption', referencedColumnNames: ['id'] },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('checklistFilledAnswer')
  }
}
