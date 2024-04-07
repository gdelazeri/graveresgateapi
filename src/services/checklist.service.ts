import DataSource from '../dataSource';
import {
  ChecklistQuestion,
  ChecklistQuestionItem,
  ChecklistQuestionOption,
  ChecklistType
} from '../interfaces/Checklist';
import { Checklist } from '../models/checklist.model';

const repository = DataSource.getRepository(Checklist);

export async function getChecklistQuestions(type: ChecklistType): Promise<ChecklistQuestion[]> {
  try {
    return repository.query(`
      SELECT cq.id, cq."text", cq."type", cq."hasOtherOption" 
      FROM "checklistQuestion" cq
      LEFT JOIN checklist c ON c.id = cq."checklistId"
      WHERE c."type" = '${type}'
      ORDER BY cq."order" ASC
    `);
  } catch (error) {
    throw error;
  }
}

export async function getChecklistQuestionItems(type: ChecklistType): Promise<ChecklistQuestionItem[]> {
  try {
    return repository.query(`
      SELECT cqi.id, cqi."checklistQuestionId", cqi.text
      FROM "checklistQuestionItem" cqi
      LEFT JOIN "checklistQuestion" cq ON cq.id = cqi."checklistQuestionId"
      LEFT JOIN checklist c ON c.id = cq."checklistId"
      WHERE c."type" = '${type}'
      ORDER BY cq."order" ASC
    `);
  } catch (error) {
    throw error;
  }
}

export async function getChecklistQuestionOptions(type: ChecklistType): Promise<ChecklistQuestionOption[]> {
  try {
    return repository.query(`
      SELECT cqo.id, cqo."checklistQuestionId", cqo.text
      FROM "checklistQuestionOption" cqo
      LEFT JOIN "checklistQuestion" cq ON cq.id = cqo."checklistQuestionId"
      LEFT JOIN checklist c ON c.id = cq."checklistId"
      WHERE c."type" = '${type}'
      ORDER BY cq."order" ASC
    `);
  } catch (error) {
    throw error;
  }
}
