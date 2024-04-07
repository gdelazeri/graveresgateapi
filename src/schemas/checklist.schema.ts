import { object, string } from 'yup';
import { ChecklistType } from '../interfaces/Checklist';

export const getChecklistQuestion = object({
  params: object({
    type: string().required().oneOf(Object.values(ChecklistType))
  })
});
