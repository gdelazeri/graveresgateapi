import { number, object, string } from 'yup';
import { MAX_PAGE_SIZE } from '../enum/Constants';

export const getByIdSchema = object({
  params: object({
    id: string().required(),
  })
    .noUnknown(true)
    .strict(),
});

export const listSchema = object({
  query: object({
    vehicleId: string().optional(),
    page: number().required().min(1),
    pageSize: number().required().min(1).max(MAX_PAGE_SIZE),
  }),
});

export const postVehicleTripSchema = object({
  body: object({
    vehicleId: string().required(),
    driverId: string().required(),
    date: string().required(),
    kmInitial: string().required(),
    kmFinal: string().required(),
    startAt: string().required(),
    endAt: string().required(),
    place: string().required(),
    reason: string().required(),
  }),
});

export const putVehicleTripSchema = object({
  params: object({
    id: string().required(),
  })
    .noUnknown(true)
    .strict(),
  body: object({
    vehicleId: string().required(),
    driverId: string().required(),
    date: string().required(),
    kmInitial: string().required(),
    kmFinal: string().required(),
    startAt: string().required(),
    endAt: string().required(),
    place: string().required(),
    reason: string().required(),
  }),
});
