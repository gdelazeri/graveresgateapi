import { Request, Response } from "express";
import { GetChecklistParams } from "../interfaces/Checklist";
import { getChecklist, getChecklistQuestionItems, getChecklistQuestionOptions, getChecklistQuestions } from "../services/checklist.service";
import { INTERNAL_SERVER_ERROR, OK } from "http-status";
import ResponseData from "../utils/ResponseData";

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

    const checklist = await getChecklist(type)
    const questions = await getChecklistQuestions(type)
    const questionItems = await getChecklistQuestionItems(type)
    const questionOptions = await getChecklistQuestionOptions(type)

    const checklistQuestions = questions.map((question) => {
      const items = questionItems.filter((item) => item.checklistQuestionId === question.id)
      const options = questionOptions.filter((item) => item.checklistQuestionId === question.id)
      return {
        ...question,
        items,
        options,
      }
    })

    const result = {
      ...checklist,
      questions: checklistQuestions,
    }

    return res.status(OK).send(new ResponseData(result));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}
