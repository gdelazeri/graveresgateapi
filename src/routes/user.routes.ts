import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import {
  postUser,
  postLogin,
  putUser,
  deleteUser,
  putOwnUser,
  getOwnUser,
  getUserById,
  listActiveUsers,
  listAllUsers,
  approveUser,
} from '../controllers/user.controller';
import {
  postUserSchema,
  postLoginSchema,
  putUserSchema,
  deleteUserSchema,
  putOwnUserSchema,
  getOwnUserSchema,
  getByIdUserSchema,
  approveUserSchema,
} from '../schemas/user.schema';
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
  '/list/active',
  requiresAuth([Permission.ADMIN, Permission.VOLUNTARY, Permission.TRAINEE]),
  listActiveUsers,
);

router.get(
  '/list/all',
  requiresAuth([Permission.ADMIN]),
  listAllUsers,
);

router.post('', validateRequest(postUserSchema), postUser);

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
  '/:id',
  requiresAuth([Permission.ADMIN]),
  validateRequest(deleteUserSchema),
  deleteUser,
);

router.post('/login', validateRequest(postLoginSchema), postLogin);

router.patch(
  '/:id/approve',
  requiresAuth([Permission.ADMIN]),
  validateRequest(approveUserSchema),
  approveUser,
);


export default router;
