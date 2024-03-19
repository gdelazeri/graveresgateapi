import { object, string } from 'yup';

export const getByIdSchema = object({
  params: object({
    id: string().required(),
  })
    .noUnknown(true)
    .strict(),
});

export const postVehicleSchema = object({
  body: object({
    name: string().required(),
    licensePlate: string().required(),
    brand: string().required(),
    model: string().required(),
    year: string().required(),
  })
});

export const putVehicleSchema = object({
  params: object({
    id: string().required(),
  })
    .noUnknown(true)
    .strict(),
  body: object({
    name: string().required(),
    licensePlate: string().required(),
    brand: string().required(),
    model: string().required(),
    year: string().required(),
  })
});

export const deleteVehicleSchema = object({
  params: object({
    id: string().required(),
  })
    .noUnknown(true)
    .strict(),
});
