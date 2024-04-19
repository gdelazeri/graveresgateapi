import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, NOT_FOUND, NO_CONTENT, OK } from 'http-status';
import { VehicleErrorCodes } from '../enum/ErrorCodes';
import ResponseData from '../utils/ResponseData';
import {
  createVehicle,
  findAll,
  findAvailable,
  findById,
  softDelete,
  updateVehicle,
} from '../services/vehicle.service';
import { PostVehiclePayload, VehicleParams } from '../interfaces/Vehicle';

export async function getById(
  req: Request<VehicleParams, unknown, unknown>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['Vehicle']
    #swagger.description = 'Get vehicle data by id'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['404']
    #swagger.responses['500']
  */
  try {
    const {
      params: { id },
    } = req;

    const vehicle = await findById(id);

    if (!vehicle) {
      return res.sendStatus(NOT_FOUND);
    }

    return res.status(OK).send(new ResponseData(vehicle));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function list(
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['Vehicle']
    #swagger.description = 'List vehicles'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const list = await findAll();

    return res.status(OK).send(new ResponseData(list));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function listAvailable(
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['Vehicle']
    #swagger.description = 'List available vehicles'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const list = await findAvailable();

    return res.status(OK).send(new ResponseData(list));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function postVehicle(
  req: Request<unknown, unknown, PostVehiclePayload>,
  res: Response,
) {
  /*
    #swagger.tags = ['Vehicle']
    #swagger.description = 'Register a vehicle'
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
    const { body } = req;

    const payload = {
      name: body.name,
      licensePlate: body.licensePlate,
      brand: body.brand,
      model: body.model,
      year: body.year,
      isAvailable: body.isAvailable,
    };

    const vehicle = await createVehicle(payload);

    return res.status(OK).send(new ResponseData(vehicle));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function putVehicle(
  req: Request<VehicleParams, unknown, PostVehiclePayload>,
  res: Response,
) {
  /*
    #swagger.tags = ['Vehicle']
    #swagger.description = 'Update a vehicle'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.parameters['id'] = {
      in: 'params',
      description: 'vehicle id',
      required: true,
      type: 'string',
    }
    #swagger.parameters['payload'] = {
      in: 'body',
      required: true,
      type: 'object',
      schema: { $ref: "#/definitions/PostVehicle" }
    }
    #swagger.responses['204']
    #swagger.responses['404']
    #swagger.responses['500']
  */
  try {
    const {
      body,
      params: { id },
    } = req;

    const payload = {
      name: body.name,
      licensePlate: body.licensePlate,
      brand: body.brand,
      model: body.model,
      year: body.year,
      isAvailable: body.isAvailable,
    };

    if (!(await findById(id))) {
      return res
        .status(NOT_FOUND)
        .send(new ResponseData(null, VehicleErrorCodes.VehicleInexistent));
    }

    await updateVehicle(id, payload);

    const vehicle = await findById(id);

    return res.status(OK).send(new ResponseData(vehicle));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function deleteVehicle(
  req: Request<VehicleParams>,
  res: Response,
) {
  /*
    #swagger.tags = ['Vehicle']
    #swagger.description = 'Delete a vehicle'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.parameters['id'] = {
      in: 'params',
      required: true,
      description: 'Vehicle id',
      type: 'string',
    }
    #swagger.responses['200']
    #swagger.responses['404']
    #swagger.responses['500']
  */
  try {
    const {
      params: { id },
    } = req;

    if (!(await findById(id))) {
      return res
        .status(NOT_FOUND)
        .send(new ResponseData(null, VehicleErrorCodes.VehicleInexistent));
    }

    await softDelete(id);

    return res.sendStatus(OK);
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}
