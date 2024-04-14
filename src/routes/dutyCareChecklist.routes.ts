import express from 'express';
import {
  post,
  listByDuty,
  getById
} from '../controllers/dutyCareChecklist.controller';
import validateRequest from '../middlewares/validateRequest';
import requiresAuth from '../middlewares/requiresAuth';
import {
  getByIdSchema,
  listByDutyIdSchema,
  postSchema
} from '../schemas/dutyCareChecklist.schema';

const router = express.Router();

router.post(
  '',
  requiresAuth([]),
  validateRequest(postSchema),
  post,
);

router.get(
  '/:dutyId',
  requiresAuth([]),
  validateRequest(listByDutyIdSchema),
  listByDuty,
);

router.get(
  '/getById/:id',
  requiresAuth([]),
  validateRequest(getByIdSchema),
  getById,
);

export default router;
