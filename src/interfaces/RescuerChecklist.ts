import * as core from 'express-serve-static-core';
import { ChecklistFilledAnswer } from './Checklist';


export interface GetRescuerChecklistByIdParams extends core.ParamsDictionary {
  id: string;
}

export interface ListPagedQuery extends core.Query {
  page: string;
  pageSize: string;
}

export interface PostRescuerChecklistPayload {
  dutyId: string;
  vehicleId: string;
  checklistAnswers?: ChecklistFilledAnswer[];
}
