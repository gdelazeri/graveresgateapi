import * as core from 'express-serve-static-core';
import DutyShift from "../enum/duty/DutyShift";

export interface DutyParams extends core.ParamsDictionary {
  id: string
}

export enum ListDutyPeriod {
  PAST = 'PAST',
  CURRENT = 'CURRENT',
  FUTURE = 'FUTURE',
}

export interface ListDutyQuery extends core.Query {
  period: ListDutyPeriod;
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
