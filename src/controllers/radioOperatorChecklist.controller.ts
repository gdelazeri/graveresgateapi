import { Request, Response } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from 'http-status';
import {
  GetRadioOperatorChecklistByIdParams,
  ListPagedQuery,
  PostRadioOperatorChecklistPayload,
} from '../interfaces/RadioOperatorChecklist';
import {
  getChecklist,
  getChecklistByChecklistFilledId,
  getChecklistFilledAnswers,
  insertChecklistFilledAnswers,
} from '../services/checklist.service';
import ChecklistType from '../enum/checklist/ChecklistType';
import {
  ChecklistErrorCodes,
  RadioOperatorChecklistErrorCodes,
  DutyErrorCodes,
} from '../enum/ErrorCodes';
import ResponseData from '../utils/ResponseData';
import dataSource from '../dataSource';
import { ChecklistFilled } from '../models/checklistFilled.model';
import { findById as findDutyById } from '../services/duty.service';
import {
  findRadioOperatorChecklistById,
  findRadioOperatorChecklistPaged,
} from '../services/radioOperatorChecklist.service';
import { RadioOperatorChecklist } from '../models/radioOperatorChecklist.model';

export async function post(
  req: Request<unknown, unknown, PostRadioOperatorChecklistPayload>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['RadioOperatorChecklist']
    #swagger.description = 'Save radioOperator checklist answers'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  const queryRunner = dataSource.createQueryRunner();
  try {
    const { body, userId } = req;

    const checklist = await getChecklist(ChecklistType.RADIO_OPERATOR);
    if (!checklist) {
      return res.status(BAD_REQUEST).send(ChecklistErrorCodes.NotFound);
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
      RadioOperatorChecklist,
      queryRunner.manager.create(RadioOperatorChecklist, {
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
  req: Request<GetRadioOperatorChecklistByIdParams>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['RadioOperatorChecklist']
    #swagger.description = 'Get radioOperator checklist by id'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const { id } = req.params;

    const radioOperatorChecklist = await findRadioOperatorChecklistById(id);
    if (!radioOperatorChecklist) {
      return res.status(BAD_REQUEST).send(RadioOperatorChecklistErrorCodes.NotFound);
    }

    const checklistFilledAnswers = await getChecklistFilledAnswers(
      radioOperatorChecklist.checklistFilledId,
    );
    const checklist = await getChecklistByChecklistFilledId(
      radioOperatorChecklist.checklistFilledId,
    );

    const result = {
      ...radioOperatorChecklist,
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
    #swagger.tags = ['RadioOperatorChecklist']
    #swagger.description = 'List radioOperator checklist by page'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const { page, pageSize } = req.query;

    const result = await findRadioOperatorChecklistPaged(
      parseInt(page),
      parseInt(pageSize),
    );

    return res.status(OK).send(new ResponseData(result));
  } catch (error) {
    return res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}
