import * as core from 'express-serve-static-core';
import { ChecklistFilledAnswer } from './Checklist';


export interface GetRadioOperatorChecklistByIdParams extends core.ParamsDictionary {
  id: string;
}

export interface ListPagedQuery extends core.Query {
  page: string;
  pageSize: string;
}

export interface PostRadioOperatorChecklistPayload {
  dutyId: string;
  note: string;
  checklistAnswers?: ChecklistFilledAnswer[];
}
