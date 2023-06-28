import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { postUser } from '../controllers/user.controller';
import { createUserSchema } from '../schemas/user.schema';

const router = express.Router();

router.post(
  '/',
  validateRequest(createUserSchema),
  postUser,
);

export default router;