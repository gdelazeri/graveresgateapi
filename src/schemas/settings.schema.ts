import { object, string } from 'yup';

export const getSettingSchema = object({
  params: object({
    key: string().required()
  })
});
