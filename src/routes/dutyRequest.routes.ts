import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import {
  deleteDutyRequestSchema,
  getByIdSchema, listByDateAndShiftSchema, postDutyRequestSchema, putDutyRequestSchema,
} from '../schemas/dutyRequest.schema';
import requiresAuth from '../middlewares/requiresAuth';
import Permission from '../enum/user/UserPermission';
import {
  deleteDutyRequest,
  getById,
  listByDateAndShift,
  listByUser,
  postDutyRequest,
  putDutyRequest
} from '../controllers/dutyRequest.controller';

const router = express.Router();

router.get(
  '/getById/:id',
  requiresAuth([Permission.ADMIN, Permission.VOLUNTARY, Permission.TRAINEE]),
  validateRequest(getByIdSchema),
  getById,
);

router.get(
  '/listByDateAndShift',
  requiresAuth([Permission.ADMIN]),
  validateRequest(listByDateAndShiftSchema),
  listByDateAndShift,
);

router.get(
  '/listByUser',
  requiresAuth([Permission.ADMIN, Permission.VOLUNTARY, Permission.TRAINEE]),
  listByUser,
);

router.post(
  '',
  requiresAuth([Permission.ADMIN, Permission.VOLUNTARY, Permission.TRAINEE]),
  validateRequest(postDutyRequestSchema),
  postDutyRequest
);

router.put(
  '/:id',
  requiresAuth([Permission.ADMIN, Permission.VOLUNTARY, Permission.TRAINEE]),
  validateRequest(putDutyRequestSchema),
  putDutyRequest,
);

router.delete(
  '/:id',
  requiresAuth([Permission.ADMIN]),
  validateRequest(deleteDutyRequestSchema),
  deleteDutyRequest,
);

export default router;
