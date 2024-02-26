import * as core from 'express-serve-static-core';
import DutyShift from "../enum/duty/DutyShift";

export interface PostDutyRequestPayload {
  date: string;
  shift: DutyShift;
  startAt: Date;
  endAt: Date;
  note: string;
}

export interface DutyRequestParams extends core.ParamsDictionary {
  id: string
}

export interface ListDutyRequest extends core.Query {
  date: string;
  shift: DutyShift;
}
