import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { postUser, postLogin, putUser, deleteUser, putOwnUser, getOwnUser, getUserById, listUsers } from '../controllers/user.controller';
import { postUserSchema, postLoginSchema, putUserSchema, deleteUserSchema, putOwnUserSchema, getOwnUserSchema, getByIdUserSchema } from '../schemas/user.schema';
import requiresAuth from '../middlewares/requiresAuth';
import Permission from '../enum/user/UserPermission';

const router = express.Router();

router.get(
  '',
  requiresAuth([Permission.ADMIN, Permission.VOLUNTARY, Permission.TRAINEE]),
  validateRequest(getOwnUserSchema),
  getOwnUser,
);

router.get(
  '/getById/:id',
  requiresAuth([Permission.ADMIN]),
  validateRequest(getByIdUserSchema),
  getUserById,
);

router.get(
  '/list',
  requiresAuth([Permission.ADMIN, Permission.VOLUNTARY]),
  listUsers,
);

router.post(
  '',
  validateRequest(postUserSchema),
  postUser,
);

router.put(
  '/:id',
  requiresAuth([Permission.ADMIN]),
  validateRequest(putUserSchema),
  putUser,
);

router.put(
  '',
  requiresAuth([Permission.ADMIN, Permission.VOLUNTARY, Permission.TRAINEE]),
  validateRequest(putOwnUserSchema),
  putOwnUser,
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