import * as core from 'express-serve-static-core';
import DutyCareChecklistIncidentContinuation from '../enum/dutyCareChecklist/DutyCareChecklistIncidentContinuation';
import { ChecklistFilledAnswer } from './Checklist';

export interface ListByDutyParams extends core.ParamsDictionary {
  dutyId: string;
}

export interface GetDriverChecklistByIdParams extends core.ParamsDictionary {
  id: string;
}

export interface ListPagedQuery extends core.Query {
  page: string;
  pageSize: string;
}

export interface PostDriverChecklistPayload {
  dutyId: string;
  kmInitial: string;
  vehicleId: string;
  checklistAnswers?: ChecklistFilledAnswer[];
}
