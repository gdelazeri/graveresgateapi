import { object, string } from 'yup';
import { ListDutyMonth } from '../interfaces/Duty';
import DutyShift from '../enum/duty/DutyShift';

export const listByMonthSchema = object({
  params: object({
    month: string().required().oneOf(Object.values(ListDutyMonth))
  })
});

export const listPreviousSchema = object({
  query: object({
    page: string().required(),
    pageSize: string().required()
  })
});

export const getSchema = object({
  params: object({
    date: string().required(),
    shift: string().required().oneOf(Object.values(DutyShift))
  })
});

export const postSchema = object({
  body: object({
    date: string().required(),
    shift: string().required().oneOf(Object.values(DutyShift)),
    leaderId: string().optional().nullable(),
    driverId: string().optional().nullable(),
    firstRescuerId: string().optional().nullable(),
    secondRescuerId: string().optional().nullable(),
    radioOperatorId: string().optional().nullable(),
    assistantRadioOperatorId: string().optional().nullable(),
    traineeId: string().optional().nullable(),
  })
});
