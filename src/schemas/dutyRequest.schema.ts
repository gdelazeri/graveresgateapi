import { object, string, array } from 'yup';
import DutyShift from '../enum/duty/DutyShift';
import DutyPosition from '../enum/duty/DutyPosition';

export const getByIdSchema = object({
  params: object({
    id: string().required(),
  })
    .noUnknown(true)
    .strict(),
});

export const listByDateAndShiftSchema = object({
  params: object({
    date: string().required(),
    shift: string().oneOf(Object.values(DutyShift)),
  }),
});

export const postDutyRequestSchema = object({
  body: object({
    date: string().required(),
    shift: string().oneOf(Object.values(DutyShift)),
    startAt: string().required(),
    endAt: string().required(),
    note: string().optional().nullable(),
    positions: array()
      .of(string().oneOf(Object.values(DutyPosition)))
      .required()
      .min(1),
  }),
});

export const deleteDutyRequestSchema = object({
  params: object({
    id: string().required(),
  })
    .noUnknown(true)
    .strict(),
});
