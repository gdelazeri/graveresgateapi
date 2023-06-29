import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { postUser, postLogin, putUser, deleteUser } from '../controllers/user.controller';
import { postUserSchema, postLoginSchema, putUserSchema, deleteUserSchema } from '../schemas/user.schema';
import requiresAuth from '../middlewares/requiresAuth';
import Permission from '../enum/user/UserPermission';

const router = express.Router();

router.post(
  '/',
  requiresAuth([Permission.ADMIN]),
  validateRequest(postUserSchema),
  postUser,
);

router.put(
  '/:_id',
  requiresAuth([Permission.ADMIN]),
  validateRequest(putUserSchema),
  putUser,
);

router.delete(
  '/:_id',
  requiresAuth([Permission.ADMIN]),
  validateRequest(deleteUserSchema),
  deleteUser,
);

router.post(
  '/login',
  validateRequest(postLoginSchema),
  postLogin,
);

export default router;