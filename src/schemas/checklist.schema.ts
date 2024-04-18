import { object, string } from 'yup';
import ChecklistType from '../enum/checklist/ChecklistType';

export const getChecklistQuestionSchema = object({
  params: object({
    type: string().required().oneOf(Object.values(ChecklistType)),
  }),
});
