import { object, string } from 'yup';
import { ListDutyPeriod } from '../interfaces/Duty';

export const listSchema = object({
  query: object({
    period: string().required().oneOf(Object.values(ListDutyPeriod)),
  })
});
