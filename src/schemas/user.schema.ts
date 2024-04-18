import { boolean, number, object, string } from 'yup';
import Permission from '../enum/user/UserPermission';
import Status from '../enum/user/UserStatus';

export const getOwnUserSchema = object({
  query: object({}).noUnknown(true).strict(),
  params: object({}).noUnknown(true).strict(),
  body: object({}).noUnknown(true).strict(),
})
  .noUnknown(true)
  .strict();

export const getByIdUserSchema = object({
  params: object({
    id: string().required(),
  })
    .noUnknown(true)
    .strict(),
});

export const postUserSchema = object({
  body: object({
    name: string().required('Name is required'),
    email: string()
      .email('Must be a valid email')
      .required('Email is required'),
    birthDate: string()
      .required('Birth date is required')
      .length(
        10,
        'Birth date is too short - should be exacly 10 chars with format.',
      ),
    phone: string()
      .required('Phone is required')
      .min(11, 'Phone is too short - should be 11 chars minimum.'),
    password: string()
      .required('Password is required')
      .min(8, 'Password is too short - should be 8 chars minimum.'),
    courseId: string().optional().nullable(),
  })
    .noUnknown(true)
    .strict(),
});

export const putUserSchema = object({
  params: object({
    id: string().required(),
  })
    .noUnknown(true)
    .strict(),
  body: object({
    registrationId: string().optional().nullable(),
    name: string().optional().nullable(),
    email: string().email('Must be a valid email').optional().nullable(),
    phone: string().optional().nullable(),
    isDriver: boolean().optional().nullable(),
    isLeader: boolean().optional().nullable(),
    permission: string().oneOf(Object.values(Permission)).optional().nullable(),
    status: string().oneOf(Object.values(Status)).optional().nullable(),
    birthDate: string().optional().nullable(),
    courseId: string().optional().nullable(),
  })
    .noUnknown(true)
    .strict(),
});

export const putOwnUserSchema = object({
  body: object({
    name: string().optional(),
    email: string().email('Must be a valid email').optional(),
  })
    .noUnknown(true)
    .strict(),
});

export const deleteUserSchema = object({
  params: object({
    id: string().required(),
  })
    .noUnknown(true)
    .strict(),
});

export const postLoginSchema = object({
  body: object({
    email: string()
      .email('Must be a valid email')
      .required('Email is required'),
    password: string().required('Password is required'),
  })
    .noUnknown(true)
    .strict(),
});
