import DutyCareChecklistIncidentContinuation from '../enum/dutyCareChecklist/DutyCareChecklistIncidentContinuation';
import { ChecklistFilledAnswer } from './Checklist';

export interface PostDutyCareChecklistPayload {
  dutyId: string;
  note?: string;
  date: string;
  time: string;
  vehicleId: string;
  reason: string;
  victimName: string
  victimGender: string
  victimAge: number
  victimDocument?: string
  incidentAddress: string;
  incidentAddressDistrict: string;
  incidentAddressCity: string;
  incidentContinuation: DutyCareChecklistIncidentContinuation;
  incidentEvolution: string;
  checklistAnswers?: ChecklistFilledAnswer[]
}