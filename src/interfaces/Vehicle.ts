import * as core from 'express-serve-static-core';

export interface VehicleParams extends core.ParamsDictionary {
  id: string
}

export interface PostVehiclePayload {
  name: string;
  licensePlate: string;
}