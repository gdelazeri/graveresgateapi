import * as core from 'express-serve-static-core';

export interface VehicleTripParams extends core.ParamsDictionary {
  id: string
}

export interface ListByVehicleParams extends core.ParamsDictionary {
  vehicleId: string
}

export interface PostVehicleTripPayload {
  vehicleId: string;
  driverId: string;
  date: string;
  kmInitial: string;
  kmFinal: string;
  startTime: string;
  endTime: string;
  place: string;
  reason: string;
}