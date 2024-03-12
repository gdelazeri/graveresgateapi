import { Request, Response } from 'express';
import moment from 'moment';
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  OK,
} from 'http-status';
import ResponseData from '../utils/ResponseData';
import { ListDutyByMonthParams, ListDutyMonth, ListDutyPreviousQuery } from '../interfaces/Duty';
import { listDutyByMonth, listPreviousDuty } from '../services/duty.service';
import { GenericErrorCodes } from '../enum/ErrorCodes';
import { MAX_PAGE_SIZE } from '../enum/Constants';
import DutyWeekDay from '../enum/duty/DutyWeekDay';
import DutyShift from '../enum/duty/DutyShift';
import { Duty } from '../models/duty.model';

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

    const dutyList = await listDutyByMonth({ month });

    const monthDays = [];
    const date = moment().add(month === ListDutyMonth.NEXT ? 1 : 0, 'month').startOf('month');
    const lastMonthDay = moment().add(month === ListDutyMonth.NEXT ? 1 : 0, 'month').endOf('month');

    while (date.format('YYYY-MM-DD') <= lastMonthDay.format('YYYY-MM-DD')) {
      switch (date.weekday()) {
        case DutyWeekDay.THURSDAY:
          monthDays.push({ date: date.format('YYYY-MM-DD'), shift: DutyShift.NIGHT });
          break;
        case DutyWeekDay.FRIDAY:
          monthDays.push({ date: date.format('YYYY-MM-DD'), shift: DutyShift.DAY });
          monthDays.push({ date: date.format('YYYY-MM-DD'), shift: DutyShift.NIGHT });
          break;
        case DutyWeekDay.SATURDAY:
          monthDays.push({ date: date.format('YYYY-MM-DD'), shift: DutyShift.DAY });
          monthDays.push({ date: date.format('YYYY-MM-DD'), shift: DutyShift.NIGHT });
          break;
        case DutyWeekDay.SUNDAY:
          monthDays.push({ date: date.format('YYYY-MM-DD'), shift: DutyShift.DAY });
          break;
      }
      date.add(1, 'day');
    }

    const response: Duty[] = [];

    for (const day of monthDays) {
      const duty = dutyList.find((duty) => duty.date === day.date && duty.shift === day.shift);
      if (duty) {
        response.push({ ...duty });
      } else {
        response.push({ date: day.date, shift: day.shift } as any);
      }
    }

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
