import * as core from 'express-serve-static-core';

export interface VehicleTripParams extends core.ParamsDictionary {
  id: string;
}

export interface ListQuery extends core.Query {
  vehicleId?: string;
  page: string;
  pageSize: string;
}

export interface PostVehicleTripPayload {
  vehicleId: string;
  driverId: string;
  date: string;
  kmInitial: string;
  kmFinal: string;
  startAt: string;
  endAt: string;
  place: string;
  reason: string;
}
