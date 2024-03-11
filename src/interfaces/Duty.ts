import * as core from 'express-serve-static-core';
import DutyShift from "../enum/duty/DutyShift";
import DutyPosition from '../enum/duty/DutyPosition';

export interface DutyParams extends core.ParamsDictionary {
  id: string
}

export enum ListDutyType {
  PAST = 'PAST',
  FUTURE = 'FUTURE',
}

export interface ListDutyQuery extends core.Query {
  type: ListDutyType;
  page: string;
  pageSize: string;
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
