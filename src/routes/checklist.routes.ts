import express from 'express';
import {
  getQuestions,
} from '../controllers/checklist.controller';
import validateRequest from '../middlewares/validateRequest';
import requiresAuth from '../middlewares/requiresAuth';
import {
  getChecklistQuestionSchema
} from '../schemas/checklist.schema';

const router = express.Router();

router.get(
  '/questions/:type',
  requiresAuth([]),
  validateRequest(getChecklistQuestionSchema),
  getQuestions,
);

export default router;
