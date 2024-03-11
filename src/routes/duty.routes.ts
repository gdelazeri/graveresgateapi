import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import requiresAuth from '../middlewares/requiresAuth';
import Permission from '../enum/user/UserPermission';
import {
  list
} from '../controllers/duty.controller';
import { listSchema } from '../schemas/duty.schema';

const router = express.Router();

router.get(
  '/list',
  requiresAuth([Permission.ADMIN, Permission.VOLUNTARY, Permission.TRAINEE]),
  validateRequest(listSchema),
  list,
);

export default router;
