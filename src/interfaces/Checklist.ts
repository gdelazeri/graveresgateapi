import * as core from 'express-serve-static-core';
import ChecklistType from '../enum/checklist/ChecklistType';
import ChecklistQuestionType from '../enum/checklist/ChecklistQuestionType';

export interface GetChecklistParams extends core.ParamsDictionary {
  type: ChecklistType;
}

export interface ListByDutyParams extends core.ParamsDictionary {
  dutyId: string;
}

export interface ChecklistQuestion {
  id: string;
  checklistId: string;
  text: string;
  order: number;
  type: ChecklistQuestionType;
  hasOtherOption: boolean;
  required: boolean;
  items: ChecklistQuestionItem[];
  options: ChecklistQuestionOption[];
}

export interface ChecklistQuestionItem {
  id: string;
  checklistQuestionId: string;
  text: string;
  order: number;
}

export interface ChecklistQuestionOption {
  id: string;
  checklistQuestionId: string;
  text: string;
  order: number;
}

export interface ChecklistFilledAnswer {
  checklistQuestionId: string;
  checklistQuestion: string;
  checklistQuestionItem?: string;
  checklistQuestionOption?: string;
}

export interface DutyChecklist {
  id: string
  checklistName: string
  type: ChecklistType
}