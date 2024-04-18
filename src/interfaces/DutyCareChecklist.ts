import * as core from 'express-serve-static-core';
import DutyCareChecklistIncidentContinuation from '../enum/dutyCareChecklist/DutyCareChecklistIncidentContinuation';
import { ChecklistFilledAnswer } from './Checklist';
import { string } from 'yup';

export interface ListByDutyParams extends core.ParamsDictionary {
  dutyId: string;
}

export interface GetDutyCareByIdParams extends core.ParamsDictionary {
  id: string;
}

export interface ListPagedQuery extends core.Query {
  page: string;
  pageSize: string;
}

export interface PostDutyCareChecklistPayload {
  dutyId: string;
  note?: string;
  date: string;
  time: string;
  vehicleId: string;
  reason: string;
  victimName: string;
  victimGender: string;
  victimAge: number;
  victimDocument?: string;
  incidentAddress: string;
  incidentAddressDistrict: string;
  incidentAddressCity: string;
  incidentContinuation: DutyCareChecklistIncidentContinuation;
  incidentEvolution: string;
  checklistAnswers?: ChecklistFilledAnswer[];
}
