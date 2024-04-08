import { ChecklistFilledAnswer } from './Checklist';

export interface PostDutyCareChecklistPayload {
  vehicleId: string;
  dutyId: string;
  date: string;
  time: string;
  note: string;
  address: string;
  addressNeighborhood: string;
  addressCity: string;
  victimName: string
  victimGender: string
  victimDocument: string
  victimAge: number
  victimPhone: string
  victimAddress: string
  victimAddressNeighborhood: string
  victimAddressCity: string
  victimDestination: string
  victimState: string
  victimSituation: string
  arrivalTime: string
  incidentContinuation: string
  serviceEvolution: string
  checklistAnswers?: ChecklistFilledAnswer[]
}
