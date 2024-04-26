import { Request, Response } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from 'http-status';
import {
  GetDriverChecklistByIdParams,
  ListPagedQuery,
  PostDriverChecklistPayload,
} from '../interfaces/DriverChecklist';
import {
  getChecklist,
  getChecklistByChecklistFilledId,
  getChecklistFilledAnswers,
  insertChecklistFilledAnswers,
} from '../services/checklist.service';
import ChecklistType from '../enum/checklist/ChecklistType';
import {
  ChecklistErrorCodes,
  DriverChecklistErrorCodes,
  DutyErrorCodes,
  VehicleErrorCodes,
} from '../enum/ErrorCodes';
import ResponseData from '../utils/ResponseData';
import dataSource from '../dataSource';
import { ChecklistFilled } from '../models/checklistFilled.model';
import { findById as findVehicleById } from '../services/vehicle.service';
import { findById as findDutyById } from '../services/duty.service';
import {
  findDriverChecklistById,
  findDriverChecklistPaged,
} from '../services/driverChecklist.service';
import { DriverChecklist } from '../models/driverChecklist.model';

export async function post(
  req: Request<unknown, unknown, PostDriverChecklistPayload>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['DriverChecklist']
    #swagger.description = 'Save driver checklist answers'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  const queryRunner = dataSource.createQueryRunner();
  try {
    const { body, userId } = req;

    const checklist = await getChecklist(ChecklistType.DRIVER);
    if (!checklist) {
      return res.status(BAD_REQUEST).send(ChecklistErrorCodes.NotFound);
    }

    const vehicle = await findVehicleById(body.vehicleId);
    if (!vehicle) {
      return res.status(BAD_REQUEST).send(VehicleErrorCodes.VehicleInexistent);
    }

    const duty = await findDutyById(body.dutyId);
    if (!duty) {
      return res.status(BAD_REQUEST).send(DutyErrorCodes.NotFound);
    }

    await queryRunner.startTransaction();

    const { id: checklistFilledId } = await queryRunner.manager.save(
      ChecklistFilled,
      queryRunner.manager.create(ChecklistFilled, {
        checklistId: checklist.id,
      }),
    );

    if (Array.isArray(body.checklistAnswers)) {
      await insertChecklistFilledAnswers(queryRunner, [...body.checklistAnswers], checklistFilledId);
    }

    const { id } = await queryRunner.manager.save(
      DriverChecklist,
      queryRunner.manager.create(DriverChecklist, {
        ...body,
        checklistFilledId,
        createdByUserId: userId,
      }),
    );

    await queryRunner.commitTransaction();
    await queryRunner.release();

    return res.status(OK).send(new ResponseData({ id }));
  } catch (error) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();

    return res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function getById(
  req: Request<GetDriverChecklistByIdParams>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['DriverChecklist']
    #swagger.description = 'Get driver checklist by id'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const { id } = req.params;

    const driverChecklist = await findDriverChecklistById(id);
    if (!driverChecklist) {
      return res.status(BAD_REQUEST).send(DriverChecklistErrorCodes.NotFound);
    }

    const checklistFilledAnswers = await getChecklistFilledAnswers(
      driverChecklist.checklistFilledId,
    );
    const checklist = await getChecklistByChecklistFilledId(
      driverChecklist.checklistFilledId,
    );

    const result = {
      ...driverChecklist,
      checklistName: checklist?.name,
      checklistFilledAnswers,
    };

    return res.status(OK).send(new ResponseData(result));
  } catch (error) {
    return res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function listPaged(
  req: Request<unknown, unknown, unknown, ListPagedQuery>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['DriverChecklist']
    #swagger.description = 'List driver checklist by page'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const { page, pageSize } = req.query;

    const result = await findDriverChecklistPaged(
      parseInt(page),
      parseInt(pageSize),
    );

    return res.status(OK).send(new ResponseData(result));
  } catch (error) {
    return res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}
