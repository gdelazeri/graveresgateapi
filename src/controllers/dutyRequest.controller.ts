import { Request, Response } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from 'http-status';
import { DutyRequestErrorCodes, UserErrorCodes } from '../enum/ErrorCodes';
import ResponseData from '../utils/ResponseData';
import {
  PostDutyRequestPayload,
  DutyRequestParams,
  ListDutyRequest,
  DutyRequestReponse,
} from '../interfaces/DutyRequest';
import {
  createDutyRequest,
  findByDateAndShift,
  findById,
  softDelete,
  findByUser,
  findExistent,
} from '../services/dutyRequest.service';
import {
  createDutyRequestPosition,
  findByDutyRequestId,
} from '../services/dutyRequestPosition.service';
import { checkUserActive } from '../services/user.service';
import { createDuty, getDutyByDateAndShift } from '../services/duty.service';

export async function getById(
  req: Request<DutyRequestParams, unknown, unknown>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['DutyRequest']
    #swagger.description = 'Get duty request data by id'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['404']
    #swagger.responses['500']
  */
  try {
    const {
      params: { id },
    } = req;

    const dutyRequest = await findById(id);

    if (!dutyRequest) {
      return res.sendStatus(NOT_FOUND);
    }

    const dutyRequestPositions = await findByDutyRequestId(id);
    const response = {
      id: dutyRequest.id,
      date: dutyRequest.date,
      shift: dutyRequest.shift,
      userId: dutyRequest.userId,
      startAt: dutyRequest.startAt,
      endAt: dutyRequest.endAt,
      note: dutyRequest.note,
      positions: dutyRequestPositions.map(item => item.position),
      status: dutyRequest.status,
    } as DutyRequestReponse;

    return res.status(OK).send(new ResponseData(response));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function listByDateAndShift(
  req: Request<ListDutyRequest, unknown, unknown, unknown>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['DutyRequest']
    #swagger.description = 'List duty requests by date and shift'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.parameters['date'] = {
      in: 'query',
      description: 'Date of the duty request',
      required: true,
      type: 'string',
    }
    #swagger.parameters['shift'] = {
      in: 'query',
      description: 'Shift of the duty request',
      required: true,
      type: 'string',
    }
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const { date, shift } = req.params;

    const list = await findByDateAndShift(date, shift);
    const response: DutyRequestReponse[] = [];

    for (const item of list) {
      const dutyRequestPositions = await findByDutyRequestId(item.id);
      response.push({
        id: item.id,
        date: item.date,
        shift: item.shift,
        userId: item.userId,
        startAt: item.startAt,
        endAt: item.endAt,
        note: item.note,
        createdAt: String(item.createdAt),
        positions: dutyRequestPositions.map(item => item.position),
        status: 'PENDING',
      });
    }

    return res.status(OK).send(new ResponseData(response));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function listByUser(req: Request, res: Response) {
  /* 	
    #swagger.tags = ['DutyRequest']
    #swagger.description = 'List duty requests by user'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const { userId } = req;

    const list = await findByUser(userId);

    const response: DutyRequestReponse[] = [];

    for (const item of list) {
      const dutyRequestPositions = await findByDutyRequestId(item.id);
      response.push({
        id: item.id,
        date: item.date,
        shift: item.shift,
        userId: item.userId,
        startAt: item.startAt,
        endAt: item.endAt,
        note: item.note,
        positions: dutyRequestPositions.map(item => item.position),
        status: item.status,
        createdAt: item.createdAt,
      });
    }

    return res.status(OK).send(new ResponseData(response));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function postDutyRequest(
  req: Request<unknown, unknown, PostDutyRequestPayload>,
  res: Response,
) {
  /*
    #swagger.tags = ['DutyRequest']
    #swagger.description = 'Register a new duty request'
    #swagger.parameters['payload'] = {
      in: 'body',
      required: true,
      type: 'object',
      schema: { $ref: "#/definitions/PostNewDutyRequest" }
    }
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const { body, userId } = req;

    const user = await checkUserActive(userId);
    if (!user) {
      return res
        .status(BAD_REQUEST)
        .send(new ResponseData(null, UserErrorCodes.UserInactive));
    }

    const dutyRequestExists = await findExistent(body.date, body.shift, userId);
    if (dutyRequestExists) {
      return res
        .status(BAD_REQUEST)
        .send(
          new ResponseData(null, DutyRequestErrorCodes.DutyRequestExistent),
        );
    }

    const payload = {
      date: body.date,
      shift: body.shift,
      startAt: body.startAt,
      endAt: body.endAt,
      note: body.note,
      userId,
    };

    const dutyRequest = await createDutyRequest(payload);

    for (const position of body.positions) {
      await createDutyRequestPosition({
        position,
        dutyRequestId: dutyRequest.id,
      });
    }

    if (!(await getDutyByDateAndShift(body.date, body.shift))) {
      await createDuty({ date: body.date, shift: body.shift });
    }

    return res.status(OK).send(new ResponseData(dutyRequest));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function deleteDutyRequest(
  req: Request<DutyRequestParams>,
  res: Response,
) {
  /*
    #swagger.tags = ['DutyRequest']
    #swagger.description = 'Delete a duty request'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.parameters['id'] = {
      in: 'params',
      required: true,
      description: 'DutyRequest id',
      type: 'string',
    }
    #swagger.responses['200']
    #swagger.responses['404']
    #swagger.responses['500']
  */
  try {
    const {
      params: { id },
      userId,
    } = req;

    if (!(await findById(id))) {
      return res
        .status(NOT_FOUND)
        .send(
          new ResponseData(null, DutyRequestErrorCodes.DutyRequestInexistent),
        );
    }

    await softDelete(id, userId);

    return res.sendStatus(OK);
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}
