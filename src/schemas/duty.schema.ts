import { object, string } from 'yup';
import { ListDutyMonth } from '../interfaces/Duty';

export const listByMonthSchema = object({
  params: object({
    month: string().required().oneOf(Object.values(ListDutyMonth)),
  })
});

export const listPreviousSchema = object({
  query: object({
    page: string().required(),
    pageSize: string().required()
  })
});