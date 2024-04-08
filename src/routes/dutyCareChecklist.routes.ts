import express from 'express';
import {
  post
} from '../controllers/dutyCareChecklist.controller';
import validateRequest from '../middlewares/validateRequest';
import requiresAuth from '../middlewares/requiresAuth';
import {
  postSchema
} from '../schemas/dutyCareChecklist.schema';

const router = express.Router();

router.post(
  '',
  requiresAuth([]),
  validateRequest(postSchema),
  post,
);

export default router;
