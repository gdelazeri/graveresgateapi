import { object, string } from 'yup';
import DutyShift from '../enum/duty/DutyShift';

export const getByIdSchema = object({
  params: object({
    id: string().required(),
  })
    .noUnknown(true)
    .strict(),
});

export const listByDateAndShiftSchema = object({
  query: object({
    date: string().required(),
    shift: string().oneOf(Object.values(DutyShift)),
  })
});

export const postDutyRequestSchema = object({
  body: object({
    date: string().required(),
    shift: string().oneOf(Object.values(DutyShift)),
    startAt: string().required(),
    endAt: string().required(),
    note: string().optional().nullable(),
  })
});

export const putDutyRequestSchema = object({
  params: object({
    id: string().required(),
  })
    .noUnknown(true)
    .strict(),
  body: object({
    date: string().required(),
    shift: string().oneOf(Object.values(DutyShift)),
    startAt: string().required(),
    endAt: string().required(),
    note: string().optional().nullable(),
  })
});

export const deleteDutyRequestSchema = object({
  params: object({
    id: string().required(),
  })
    .noUnknown(true)
    .strict(),
});
