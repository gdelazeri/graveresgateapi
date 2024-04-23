import { Request, Response } from 'express';
import moment from 'moment';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import ResponseData from '../utils/ResponseData';
import {
  DutyPayload,
  GetDutyParams,
  ListDutyByMonthParams,
  ListDutyMonth,
  ListDutyPreviousQuery,
} from '../interfaces/Duty';
import {
  listDutyByMonth,
  listPreviousDuty,
  getDutyByDateAndShift,
  updateDuty,
  createDuty,
  getDutyByDateAndShiftWithUserNames,
  listDutiesByDate,
} from '../services/duty.service';
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
    const date = moment()
      .add(month === ListDutyMonth.NEXT ? 1 : 0, 'month')
      .startOf('month');
    const lastMonthDay = moment()
      .add(month === ListDutyMonth.NEXT ? 1 : 0, 'month')
      .endOf('month');

    while (date.format('YYYY-MM-DD') <= lastMonthDay.format('YYYY-MM-DD')) {
      switch (date.weekday()) {
        case DutyWeekDay.THURSDAY:
          monthDays.push({
            date: date.format('YYYY-MM-DD'),
            shift: DutyShift.NIGHT,
          });
          break;
        case DutyWeekDay.FRIDAY:
          monthDays.push({
            date: date.format('YYYY-MM-DD'),
            shift: DutyShift.DAY,
          });
          monthDays.push({
            date: date.format('YYYY-MM-DD'),
            shift: DutyShift.NIGHT,
          });
          break;
        case DutyWeekDay.SATURDAY:
          monthDays.push({
            date: date.format('YYYY-MM-DD'),
            shift: DutyShift.DAY,
          });
          monthDays.push({
            date: date.format('YYYY-MM-DD'),
            shift: DutyShift.NIGHT,
          });
          break;
        case DutyWeekDay.SUNDAY:
          monthDays.push({
            date: date.format('YYYY-MM-DD'),
            shift: DutyShift.DAY,
          });
          break;
      }
      date.add(1, 'day');
    }

    const response: Duty[] = [];

    for (const day of monthDays) {
      const duty = dutyList.find(
        duty => duty.date === day.date && duty.shift === day.shift,
      );
      if (duty) {
        response.push({ ...duty });
      } else {
        response.push({ date: day.date, shift: day.shift, isAvailable: true } as unknown as Duty);
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

    const response = await listPreviousDuty({
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    });

    return res.status(OK).send(new ResponseData(response));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function getDuty(
  req: Request<GetDutyParams, unknown, unknown, unknown>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['Duty']
    #swagger.description = 'Get duty information'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const { date, shift } = req.params;

    const duty = await getDutyByDateAndShiftWithUserNames(date, shift);
    let response: Duty;

    if (duty) {
      response = { ...duty } as Duty;
    } else {
      response = { date, shift, isAvailable: true } as unknown as Duty;
    }

    return res.status(OK).send(new ResponseData(response));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function postDuty(
  req: Request<unknown, unknown, DutyPayload>,
  res: Response,
) {
  /*
    #swagger.tags = ['Duty']
    #swagger.description = 'Create/update a new duty'
    #swagger.parameters['payload'] = {
      in: 'body',
      required: true,
      type: 'object',
      schema: { $ref: "#/definitions/PostDuty" }
    }
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const { body } = req;
    const payload = { ...body };

    const duty = await getDutyByDateAndShift(payload.date, payload.shift);

    if (duty) {
      await updateDuty(duty.id, payload);
    } else {
      await createDuty(payload);
    }

    const response = await getDutyByDateAndShiftWithUserNames(
      payload.date,
      payload.shift,
    );

    return res.status(OK).send(new ResponseData(response));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function listDutiesForChecklist(req: Request, res: Response) {
  /* 	
    #swagger.tags = ['Duty']
    #swagger.description = 'List nearby duties'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');
    const today = moment().format('YYYY-MM-DD');

    const response = await listDutiesByDate({
      dateMin: yesterday,
      dateMax: today,
    });

    return res.status(OK).send(new ResponseData(response));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}
