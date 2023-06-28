import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { postUser, postLogin } from '../controllers/user.controller';
import { createUserSchema, loginSchema } from '../schemas/user.schema';

const router = express.Router();

router.post(
  '/',
  validateRequest(createUserSchema),
  postUser,
);

router.post(
  '/login',
  validateRequest(loginSchema),
  postLogin,
);

export default router;