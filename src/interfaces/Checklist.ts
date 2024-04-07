import * as core from 'express-serve-static-core';

export enum ChecklistType {
  DUTY_CARE = 'DUTY_CARE',
  DRIVER = 'DRIVER',
  RESCUER = 'RESCUER',
  RADIO_OPERATOR = 'RADIO_OPERATOR',
}

export interface GetChecklistParams extends core.ParamsDictionary {
  type: ChecklistType;
}

export type ChecklistQuestionType = 'TEXT' | 'OPTION'

export interface ChecklistQuestion {
  id: string
  checklistId: string
  text: string
  order: number
  type: ChecklistQuestionType
  hasOtherOption: boolean
  options: ChecklistQuestionOption[]
}

export interface ChecklistQuestionItem {
  id: string
  checklistQuestionId: string
  text: string
  order: number
}

export interface ChecklistQuestionOption {
  id: string
  checklistQuestionId: string
  text: string
  order: number
}