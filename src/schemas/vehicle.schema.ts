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

export const postVehicleSchema = object({
  body: object({
    name: string().required(),
    licensePlate: string().required(),
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
  })
});

export const deleteVehicleSchema = object({
  params: object({
    id: string().required(),
  })
    .noUnknown(true)
    .strict(),
});
