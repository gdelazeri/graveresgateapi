import * as core from 'express-serve-static-core';
import DutyShift from '../enum/duty/DutyShift';

export interface DutyParams extends core.ParamsDictionary {
  id: string;
}

export enum ListDutyMonth {
  CURRENT = 'CURRENT',
  NEXT = 'NEXT',
}

export interface ListDutyByMonthParams extends core.ParamsDictionary {
  month: ListDutyMonth;
}

export interface ListDutyPreviousQuery extends core.Query {
  page: string;
  pageSize: string;
}

export interface GetDutyParams extends core.ParamsDictionary {
  date: string;
  shift: DutyShift;
}

export interface DutyPayload {
  date: string;
  shift: DutyShift;
  leaderId: string;
  driverId: string;
  firstRescuerId: string;
  secondRescuerId: string;
  radioOperatorId: string;
  assistantRadioOperatorId: string;
  traineeId: string;
}

export interface DutyReponse {
  id: string;
  date: string;
  shift: DutyShift;
  leaderId: string;
  driverId: string;
  firstRescuerId: string;
  secondRescuerId: string;
  radioOperatorId: string;
  assistantRadioOperatorId: string;
  traineeId: string;
}
