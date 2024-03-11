import { object, string, array } from 'yup';
import { ListDutyType } from '../interfaces/Duty';

export const listSchema = object({
  query: object({
    page: string().required(),
    pageSize: string().required(),
    type: string().oneOf(Object.values(ListDutyType)),
  })
});
