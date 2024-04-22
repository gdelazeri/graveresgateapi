import express from 'express';
import { getQuestions, listByDuty } from '../controllers/checklist.controller';
import validateRequest from '../middlewares/validateRequest';
import requiresAuth from '../middlewares/requiresAuth';
import { getChecklistQuestionSchema, listByDutyIdSchema } from '../schemas/checklist.schema';

const router = express.Router();

router.get(
  '/questions/:type',
  requiresAuth([]),
  validateRequest(getChecklistQuestionSchema),
  getQuestions,
);

router.get(
  '/list/duty/:dutyId',
  requiresAuth([]),
  validateRequest(listByDutyIdSchema),
  listByDuty,
);

export default router;
