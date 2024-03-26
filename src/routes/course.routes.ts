import express from 'express';
import {
  list,
} from '../controllers/vehicle.controller';

const router = express.Router();

router.get(
  '/list',
  list,
);

export default router;
