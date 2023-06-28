import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { postUser, postLogin, putUser } from '../controllers/user.controller';
import { postUserSchema, postLoginSchema, putUserSchema } from '../schemas/user.schema';

const router = express.Router();

router.post(
  '/',
  validateRequest(postUserSchema),
  postUser,
);

router.put(
  '/:_id',
  validateRequest(putUserSchema),
  putUser,
);

router.post(
  '/login',
  validateRequest(postLoginSchema),
  postLogin,
);

export default router;