import express from 'express';
import {
  post,
  getById,
  listPaged,
} from '../controllers/rescuerChecklist.controller';
import validateRequest from '../middlewares/validateRequest';
import requiresAuth from '../middlewares/requiresAuth';
import {
  getByIdSchema,
  listPagedSchema,
  postSchema,
} from '../schemas/rescuerChecklist.schema';

const router = express.Router();

router.post('', requiresAuth([]), validateRequest(postSchema), post);

router.get(
  '/get/:id',
  requiresAuth([]),
  validateRequest(getByIdSchema),
  getById,
);

router.get(
  '/list/paged',
  requiresAuth([]),
  validateRequest(listPagedSchema),
  listPaged,
);

export default router;
