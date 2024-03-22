import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import requiresAuth from '../middlewares/requiresAuth';
import Permission from '../enum/user/UserPermission';
import {
  listByMonth,
  listPrevious,
  getDuty,
  postDuty
} from '../controllers/duty.controller';
import { getSchema, listByMonthSchema, listPreviousSchema, postSchema } from '../schemas/duty.schema';

const router = express.Router();

router.get(
  '/listByMonth/:month',
  requiresAuth([]),
  validateRequest(listByMonthSchema),
  listByMonth,
);

router.get(
  '/listPrevious',
  requiresAuth([Permission.ADMIN]),
  validateRequest(listPreviousSchema),
  listPrevious,
);

router.get(
  '/get/:date/:shift',
  requiresAuth([Permission.ADMIN]),
  validateRequest(getSchema),
  getDuty,
);

router.post(
  '',
  requiresAuth([Permission.ADMIN]),
  validateRequest(postSchema),
  postDuty,
);

export default router;
