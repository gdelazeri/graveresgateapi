import express from 'express';
import { getSetting } from '../controllers/settings.controller';
import validateRequest from '../middlewares/validateRequest';
import { getSettingSchema } from '../schemas/settings.schema';
import requiresAuth from '../middlewares/requiresAuth';

const router = express.Router();

router.get(
  '/get/:key',
  requiresAuth([]),
  validateRequest(getSettingSchema),
  getSetting,
);

export default router;
