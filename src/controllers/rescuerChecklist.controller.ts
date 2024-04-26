import { Request, Response } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from 'http-status';
import {
  GetRescuerChecklistByIdParams,
  ListPagedQuery,
  PostRescuerChecklistPayload,
} from '../interfaces/RescuerChecklist';
import {
  getChecklist,
  getChecklistByChecklistFilledId,
  getChecklistFilledAnswers,
  insertChecklistFilledAnswers,
} from '../services/checklist.service';
import ChecklistType from '../enum/checklist/ChecklistType';
import {
  ChecklistErrorCodes,
  RescuerChecklistErrorCodes,
  DutyErrorCodes,
  VehicleErrorCodes,
} from '../enum/ErrorCodes';
import ResponseData from '../utils/ResponseData';
import dataSource from '../dataSource';
import { ChecklistFilled } from '../models/checklistFilled.model';
import { findById as findVehicleById } from '../services/vehicle.service';
import { findById as findDutyById } from '../services/duty.service';
import {
  findRescuerChecklistById,
  findRescuerChecklistPaged,
} from '../services/rescuerChecklist.service';
import { RescuerChecklist } from '../models/rescuerChecklist.model';

export async function post(
  req: Request<unknown, unknown, PostRescuerChecklistPayload>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['RescuerChecklist']
    #swagger.description = 'Save rescuer checklist answers'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  const queryRunner = dataSource.createQueryRunner();
  try {
    const { body, userId } = req;

    const checklist = await getChecklist(ChecklistType.RESCUER);
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
      RescuerChecklist,
      queryRunner.manager.create(RescuerChecklist, {
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
  req: Request<GetRescuerChecklistByIdParams>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['RescuerChecklist']
    #swagger.description = 'Get rescuer checklist by id'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const { id } = req.params;

    const rescuerChecklist = await findRescuerChecklistById(id);
    if (!rescuerChecklist) {
      return res.status(BAD_REQUEST).send(RescuerChecklistErrorCodes.NotFound);
    }

    const checklistFilledAnswers = await getChecklistFilledAnswers(
      rescuerChecklist.checklistFilledId,
    );
    const checklist = await getChecklistByChecklistFilledId(
      rescuerChecklist.checklistFilledId,
    );

    const result = {
      ...rescuerChecklist,
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
    #swagger.tags = ['RescuerChecklist']
    #swagger.description = 'List rescuer checklist by page'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const { page, pageSize } = req.query;

    const result = await findRescuerChecklistPaged(
      parseInt(page),
      parseInt(pageSize),
    );

    return res.status(OK).send(new ResponseData(result));
  } catch (error) {
    return res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}
