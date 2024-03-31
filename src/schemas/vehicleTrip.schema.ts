import { object, string } from 'yup';

export const getByIdSchema = object({
  params: object({
    id: string().required(),
  })
    .noUnknown(true)
    .strict(),
});

export const listByVehicleSchema = object({
  params: object({
    vehicleId: string().required(),
  })
    .noUnknown(true)
    .strict(),
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
  })
});


export const putVehicleTripSchema = object({
  params: object({
    id: string().required(),
  }).noUnknown(true).strict(),
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
  })
});