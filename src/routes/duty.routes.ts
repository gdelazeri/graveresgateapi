import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import requiresAuth from '../middlewares/requiresAuth';
import Permission from '../enum/user/UserPermission';
import {
  listByMonth,
  listPrevious
} from '../controllers/duty.controller';
import { listByMonthSchema, listPreviousSchema } from '../schemas/duty.schema';

const router = express.Router();

router.get(
  '/listByMonth/:month',
  requiresAuth([Permission.ADMIN, Permission.VOLUNTARY, Permission.TRAINEE]),
  validateRequest(listByMonthSchema),
  listByMonth,
);

router.get(
  '/listPrevious',
  requiresAuth([Permission.ADMIN]),
  validateRequest(listPreviousSchema),
  listPrevious,
);

export default router;
