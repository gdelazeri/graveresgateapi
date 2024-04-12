import { array, number, object, string } from 'yup';
import DutyCareChecklistIncidentContinuation from '../enum/dutyCareChecklist/DutyCareChecklistIncidentContinuation';

export const postSchema = object({
  body: object({
    dutyId: string().required(),
    note: string().optional().nullable(),
    date: string().required(),
    time: string().required(),
    vehicleId: string().required(),
    reason: string().required(),
    victimName: string().required(),
    victimGender: string().required(),
    victimAge: number().required().min(0),
    victimDocument: string().optional(),
    incidentAddress: string().required(),
    incidentAddressDistrict: string().required(),
    incidentAddressCity: string().required(),
    incidentContinuation: string().required().oneOf(Object.values(DutyCareChecklistIncidentContinuation)),
    incidentEvolution: string().required(),
    checklistAnswers: array().of(
      object().shape({
        checklistQuestionId: string().required(),
        checklistQuestion: string().required(),
        checklistQuestionItem: string().optional().nullable(),
        checklistQuestionOption: string().optional().nullable(),
      })
    )
  })
});
