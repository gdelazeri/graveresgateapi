import { Request, Response } from 'express';
import { GetChecklistParams, ListByDutyParams } from '../interfaces/Checklist';
import {
  getChecklist,
  getChecklistQuestionItems,
  getChecklistQuestionOptions,
  getChecklistQuestions,
  findChecklistsByDutyId
} from '../services/checklist.service';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from 'http-status';
import ResponseData from '../utils/ResponseData';
import { ChecklistErrorCodes } from '../enum/ErrorCodes';

export async function getQuestions(
  req: Request<GetChecklistParams, unknown, unknown, unknown>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['Checklist']
    #swagger.description = 'List questions for a checklist type'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const { type } = req.params;

    const checklist = await getChecklist(type);
    const questions = await getChecklistQuestions(type);
    const questionItems = await getChecklistQuestionItems(type);
    const questionOptions = await getChecklistQuestionOptions(type);

    const checklistQuestions = questions.map(question => {
      const items = questionItems.filter(
        item => item.checklistQuestionId === question.id,
      );
      const options = questionOptions.filter(
        item => item.checklistQuestionId === question.id,
      )
      return {
        ...question,
        items,
        options,
      };
    });

    const result = {
      ...checklist,
      questions: checklistQuestions,
    };

    return res.status(OK).send(new ResponseData(result));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function listByDuty(
  req: Request<ListByDutyParams>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['Checklist']
    #swagger.description = 'List checklists by duty id'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const { dutyId } = req.params;

    const result = await findChecklistsByDutyId(dutyId);

    if (!result) {
      return res.status(BAD_REQUEST).send(ChecklistErrorCodes.NotFound);
    }

    return res.status(OK).send(new ResponseData(result));
  } catch (error) {
    return res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}