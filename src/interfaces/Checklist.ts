import * as core from 'express-serve-static-core';
import ChecklistType from '../enum/checklist/ChecklistType';
import ChecklistQuestionType from '../enum/checklist/ChecklistQuestionType';

export interface GetChecklistParams extends core.ParamsDictionary {
  type: ChecklistType;
}

export interface ChecklistQuestion {
  id: string
  checklistId: string
  text: string
  order: number
  type: ChecklistQuestionType
  hasOtherOption: boolean
  required: boolean
  items: ChecklistQuestionItem[]
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

export interface ChecklistFilledAnswer {
  checklistQuestionId: string
  checklistQuestionItemId?: string
  checklistQuestionItemValue?: string
  checklistQuestionOptionId?: string
  checklistQuestionOptionValue: string
}
