import { object, string, AnyObject } from 'yup';

export const getSettingSchema = object({
  params: object({
    key: string().required(),
  }),
});

export const postSettingSchema = object({
  params: object({
    key: string().required(),
  }),
});
