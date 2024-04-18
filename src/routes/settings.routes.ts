import express from 'express';
import { getSetting, postSetting } from '../controllers/settings.controller';
import validateRequest from '../middlewares/validateRequest';
import {
  getSettingSchema,
  postSettingSchema,
} from '../schemas/settings.schema';
import requiresAuth from '../middlewares/requiresAuth';
import Permission from '../enum/user/UserPermission';

const router = express.Router();

router.get(
  '/get/:key',
  requiresAuth([]),
  validateRequest(getSettingSchema),
  getSetting,
);

router.post(
  '/:key',
  requiresAuth([Permission.ADMIN]),
  validateRequest(postSettingSchema),
  postSetting,
);

export default router;
