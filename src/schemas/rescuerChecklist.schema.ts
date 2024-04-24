import { array, number, object, string } from 'yup';

export const postSchema = object({
  body: object({
    dutyId: string().required(),
    vehicleId: string().required(),
    checklistAnswers: array().of(
      object().shape({
        checklistQuestionId: string().required(),
        checklistQuestion: string().required(),
        checklistQuestionItem: string().optional().nullable(),
        checklistQuestionOption: string().optional().nullable(),
      }),
    ),
  }),
});

export const getByIdSchema = object({
  params: object({
    id: string().required(),
  }),
});

export const listPagedSchema = object({
  query: object({
    page: number().required().min(1),
    pageSize: number().required(),
  }),
});
