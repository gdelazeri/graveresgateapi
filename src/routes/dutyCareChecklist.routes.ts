import express from 'express';
import {
  post,
  listByDuty,
  getById,
  listPaged,
} from '../controllers/dutyCareChecklist.controller';
import validateRequest from '../middlewares/validateRequest';
import requiresAuth from '../middlewares/requiresAuth';
import {
  getByIdSchema,
  listByDutyIdSchema,
  listPagedSchema,
  postSchema,
} from '../schemas/dutyCareChecklist.schema';

const router = express.Router();

router.post('', requiresAuth([]), validateRequest(postSchema), post);

router.get(
  '/list/duty/:dutyId',
  requiresAuth([]),
  validateRequest(listByDutyIdSchema),
  listByDuty,
);

router.get(
  '/get/:id',
  requiresAuth([]),
  validateRequest(getByIdSchema),
  getById,
);

router.get(
  '/list/paged',
  requiresAuth([]),
  validateRequest(listPagedSchema),
  listPaged,
);

export default router;
