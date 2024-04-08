import { Request, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "http-status";
import { PostDutyCareChecklistPayload } from "../interfaces/DutyCareChecklist";
import { getChecklist } from "../services/checklist.service";
import { ChecklistType } from "../interfaces/Checklist";
import { ChecklistErrorCodes } from "../enum/ErrorCodes";
import ResponseData from "../utils/ResponseData";
import dataSource from "../dataSource";
import { ChecklistFilled } from "../models/checklistFilled.model";
import { ChecklistFilledAnswer } from "../models/checklistFilledAnswer.model";
import { DutyCareChecklist } from "../models/dutyCareChecklist.model";

export async function post(
  req: Request<unknown, unknown, PostDutyCareChecklistPayload>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['DutyCareChecklist']
    #swagger.description = 'Save duty care checklist answers'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  const queryRunner = dataSource.createQueryRunner()
  try {
    const { body, userId } = req;

    const checklist = await getChecklist(ChecklistType.DUTY_CARE);

    if (!checklist) {
      return res.status(BAD_REQUEST).send(ChecklistErrorCodes.NotFound);
    }

    await queryRunner.startTransaction();

    const { id: checklistFilledId } = await queryRunner.manager.save(
      ChecklistFilled,
      queryRunner.manager.create(ChecklistFilled, {
        checklistId: checklist.id
      })
    );

    if (Array.isArray(body.checklistAnswers)) {
      for (const answer of body.checklistAnswers) {
        await queryRunner.manager.save(
          ChecklistFilledAnswer,
          queryRunner.manager.create(ChecklistFilledAnswer, {
            ...answer,
            checklistFilledId
          })
        );
      }
    }

    const { id } = await queryRunner.manager.save(
      DutyCareChecklist,
      queryRunner.manager.create(DutyCareChecklist, {
        ...body,
        checklistFilledId,
        createdByUserId: userId
      })
    );

    await queryRunner.commitTransaction();
    await queryRunner.release();

    return res.status(OK).send(new ResponseData({ id }));
  } catch (error) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();

    return res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}
