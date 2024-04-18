import { Request, Response } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from 'http-status';
import ResponseData from '../utils/ResponseData';
import {
  createVehicleTrip,
  findById,
  findPaged,
  updateVehicleTrip,
} from '../services/vehicleTrip.service';
import { findById as findVehicleById } from '../services/vehicle.service';
import { findUserById } from '../services/user.service';
import {
  ListQuery,
  PostVehicleTripPayload,
  VehicleTripParams,
} from '../interfaces/VehicleTrip';
import { VehicleErrorCodes, VehicleTripErrorCodes } from '../enum/ErrorCodes';

export async function getById(
  req: Request<VehicleTripParams, unknown, unknown>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['VehicleTrip']
    #swagger.description = 'Get vehicle trip data by id'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['404']
    #swagger.responses['500']
  */
  try {
    const {
      params: { id },
    } = req;

    const vehicleTrip = await findById(id);

    if (!vehicleTrip) {
      return res.sendStatus(NOT_FOUND);
    }

    return res.status(OK).send(new ResponseData(vehicleTrip));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function list(
  req: Request<unknown, unknown, unknown, ListQuery>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['VehicleTrip']
    #swagger.description = 'List vehicle trips'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const {
      query: { vehicleId, page, pageSize },
    } = req;

    if (vehicleId && !(await findVehicleById(vehicleId))) {
      return res
        .status(BAD_REQUEST)
        .send(new ResponseData(null, VehicleErrorCodes.VehicleInexistent));
    }

    const list = await findPaged(parseInt(page), parseInt(pageSize), vehicleId);

    return res.status(OK).send(new ResponseData(list));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function postVehicleTrip(
  req: Request<unknown, unknown, PostVehicleTripPayload>,
  res: Response,
) {
  /*
    #swagger.tags = ['VehicleTrip']
    #swagger.description = 'Register a vehicle trip'
    #swagger.parameters['payload'] = {
      in: 'body',
      required: true,
      type: 'object',
      schema: { $ref: "#/definitions/PostVehicle" }
    }
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const { body, userId } = req;

    if (!(await findVehicleById(body.vehicleId))) {
      return res
        .status(BAD_REQUEST)
        .send(new ResponseData(null, VehicleErrorCodes.VehicleInexistent));
    }

    const driver = await findUserById(body.driverId);
    if (!driver) {
      return res
        .status(BAD_REQUEST)
        .send(new ResponseData(null, VehicleTripErrorCodes.UserNotADriver));
    }

    const vehicleTrip = await createVehicleTrip({
      ...body,
      createdByUserId: userId,
    });

    return res.status(OK).send(new ResponseData(vehicleTrip));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function putVehicleTrip(
  req: Request<VehicleTripParams, unknown, PostVehicleTripPayload>,
  res: Response,
) {
  /*
    #swagger.tags = ['VehicleTrip']
    #swagger.description = 'Register a vehicle trip'
    #swagger.parameters['payload'] = {
      in: 'body',
      required: true,
      type: 'object',
      schema: { $ref: "#/definitions/PostVehicle" }
    }
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const {
      body,
      params: { id },
    } = req;

    if (!(await findVehicleById(body.vehicleId))) {
      return res
        .status(BAD_REQUEST)
        .send(new ResponseData(null, VehicleErrorCodes.VehicleInexistent));
    }

    if (!(await findById(id))) {
      return res
        .status(BAD_REQUEST)
        .send(
          new ResponseData(null, VehicleTripErrorCodes.VehicleTripInexistent),
        );
    }

    await updateVehicleTrip(id, { ...body });

    const vehicleTrip = await findById(id);

    return res.status(OK).send(new ResponseData(vehicleTrip));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}
