import { Request, Response } from 'express';
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  OK,
} from 'http-status';
import ResponseData from '../utils/ResponseData';
import { ListDutyByMonthParams, ListDutyPreviousQuery } from '../interfaces/Duty';
import { listDutyByMonth, listPreviousDuty } from '../services/duty.service';
import { GenericErrorCodes } from '../enum/ErrorCodes';
import { MAX_PAGE_SIZE } from '../enum/Constants';

export async function listByMonth(
  req: Request<ListDutyByMonthParams, unknown, unknown, unknown>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['Duty']
    #swagger.description = 'List duty by month'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const { month } = req.params;

    const response = await listDutyByMonth({ month });

    return res.status(OK).send(new ResponseData(response));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function listPrevious(
  req: Request<unknown, unknown, unknown, ListDutyPreviousQuery>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['Duty']
    #swagger.description = 'List previous duty'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const { page, pageSize } = req.query;

    if (parseInt(page) < 1 || parseInt(pageSize) > MAX_PAGE_SIZE) {
      return res
        .status(BAD_REQUEST)
        .send(new ResponseData(null, GenericErrorCodes.PaginationInvalid));
    }

    const response = await listPreviousDuty({
      page: parseInt(page),
      pageSize: parseInt(pageSize)
    });

    return res.status(OK).send(new ResponseData(response));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

// export async function postDutyRequest(
//   req: Request<unknown, unknown, PostDutyRequestPayload>,
//   res: Response,
// ) {
//   /*
//     #swagger.tags = ['DutyRequest']
//     #swagger.description = 'Register a new duty request'
//     #swagger.parameters['payload'] = {
//       in: 'body',
//       required: true,
//       type: 'object',
//       schema: { $ref: "#/definitions/PostNewDutyRequest" }
//     }
//     #swagger.responses['200']
//     #swagger.responses['400']
//     #swagger.responses['500']
//   */
//   try {
//     const { body, userId } = req;
//     const payload = {
//       date: body.date,
//       shift: body.shift,
//       startAt: body.startAt,
//       endAt: body.endAt,
//       note: body.note,
//       userId,
//     }

//     const dutyRequest = await create(payload);
    
//     for (const position of body.positions) {
//       await createDutyRequestPosition({ position, dutyRequestId: dutyRequest.id });
//     }

//     return res.status(OK).send(new ResponseData(dutyRequest));
//   } catch (error) {
//     res.sendStatus(INTERNAL_SERVER_ERROR);
//   }
// }

// export async function putDutyRequest(
//   req: Request<DutyRequestParams, unknown, PostDutyRequestPayload>,
//   res: Response,
// ) {
//   /*
//     #swagger.tags = ['DutyRequest']
//     #swagger.description = 'Update a duty request'
//     #swagger.security = [{ "Bearer": [ ] }]
//     #swagger.parameters['id'] = {
//       in: 'params',
//       description: 'DutyRequest id',
//       required: true,
//       type: 'string',
//     }
//     #swagger.parameters['payload'] = {
//       in: 'body',
//       required: true,
//       type: 'object',
//       schema: { $ref: "#/definitions/PostNewDutyRequest" }
//     }
//     #swagger.responses['204']
//     #swagger.responses['404']
//     #swagger.responses['500']
//   */
//   try {
//     const {
//       body,
//       userId,
//       params: { id },
//     } = req;

//     const payload = {
//       date: body.date,
//       shift: body.shift,
//       startAt: body.startAt,
//       endAt: body.endAt,
//       note: body.note,
//       userId,
//     }

//     if (!(await findById(id))) {
//       return res
//         .status(NOT_FOUND)
//         .send(new ResponseData(null, DutyRequestErrorCodes.DutyRequestInexistent));
//     }

//     await deleteByDutyRequestId(id);
//     await update(id, payload);
//     for (const position of body.positions) {
//       await createDutyRequestPosition({ position, dutyRequestId: id });
//     }

//     return res.sendStatus(NO_CONTENT);
//   } catch (error) {
//     res.sendStatus(INTERNAL_SERVER_ERROR);
//   }
// }
