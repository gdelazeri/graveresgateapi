import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import {
  deleteDutyRequestSchema,
  getByIdSchema,
  listByDateAndShiftSchema,
  postDutyRequestSchema,
} from '../schemas/dutyRequest.schema';
import requiresAuth from '../middlewares/requiresAuth';
import Permission from '../enum/user/UserPermission';
import {
  deleteDutyRequest,
  getById,
  listByDateAndShift,
  listByUser,
  postDutyRequest,
} from '../controllers/dutyRequest.controller';

const router = express.Router();

router.get(
  '/getById/:id',
  requiresAuth([]),
  validateRequest(getByIdSchema),
  getById,
);

router.get(
  '/list/:date/:shift',
  requiresAuth([Permission.ADMIN]),
  validateRequest(listByDateAndShiftSchema),
  listByDateAndShift,
);

router.get('/requests', requiresAuth([]), listByUser);

router.post(
  '',
  requiresAuth([]),
  validateRequest(postDutyRequestSchema),
  postDutyRequest,
);

router.delete(
  '/:id',
  requiresAuth([]),
  validateRequest(deleteDutyRequestSchema),
  deleteDutyRequest,
);

export default router;
