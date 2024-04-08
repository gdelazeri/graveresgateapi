import { array, number, object, string } from 'yup';

export const postSchema = object({
  body: object({
    vehicleId: string().required(),
    dutyId: string().required(),
    date: string().required(),
    time: string().required(),
    note: string().optional().nullable(),
    address: string().required(),
    addressNeighborhood: string().required(),
    addressCity: string().required(),
    victimName: string().required(),
    victimGender: string().required(),
    victimDocument: string().required(),
    victimAge: number().required().min(0),
    victimPhone: string().required(),
    victimAddress: string().required(),
    victimAddressNeighborhood: string().required(),
    victimAddressCity: string().required(),
    victimDestination: string().required(),
    victimState: string().required(),
    victimSituation: string().required(),
    arrivalTime: string().required(),
    incidentContinuation: string().required(),
    serviceEvolution: string().required(),
    checklistAnswers: array().of(
      object().shape({
        checklistQuestionId: string().required(),
        checklistQuestionItemId: string().optional().nullable(),
        checklistQuestionItemValue: string().optional().nullable(),
        checklistQuestionOptionId: string().optional().nullable(),
        checklistQuestionOptionValue: string().required(),
      })
    )
  })
});
