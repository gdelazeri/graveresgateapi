import * as core from 'express-serve-static-core';
import DutyShift from '../enum/duty/DutyShift';
import DutyPosition from '../enum/duty/DutyPosition';

export interface PostDutyRequestPayload {
  date: string;
  shift: DutyShift;
  startAt: string;
  endAt: string;
  note: string;
  positions: DutyPosition[];
}

export interface DutyRequestParams extends core.ParamsDictionary {
  id: string;
}

export interface ListDutyRequest extends core.ParamsDictionary {
  date: string;
  shift: DutyShift;
}

export interface DutyRequestReponse {
  id: string;
  date: string;
  shift: DutyShift;
  userId: string;
  startAt: string;
  endAt: string;
  note: string;
  positions: DutyPosition[];
  status: string;
  createdAt: string;
}
