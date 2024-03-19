import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import {
  deleteVehicleSchema,
  getByIdSchema,
  postVehicleSchema,
  putVehicleSchema,
} from '../schemas/vehicle.schema';
import requiresAuth from '../middlewares/requiresAuth';
import Permission from '../enum/user/UserPermission';
import {
  deleteVehicle,
  getById,
  list,
  postVehicle,
  putVehicle,
} from '../controllers/vehicle.controller';

const router = express.Router();

router.get(
  '/getById/:id',
  requiresAuth([Permission.ADMIN, Permission.VOLUNTARY]),
  validateRequest(getByIdSchema),
  getById,
);

router.get(
  '/list',
  requiresAuth([Permission.ADMIN, Permission.VOLUNTARY]),
  list,
);

router.post(
  '',
  requiresAuth([Permission.ADMIN]),
  validateRequest(postVehicleSchema),
  postVehicle,
);

router.put(
  '/:id',
  requiresAuth([Permission.ADMIN]),
  validateRequest(putVehicleSchema),
  putVehicle,
);

router.delete(
  '/:id',
  requiresAuth([Permission.ADMIN]),
  validateRequest(deleteVehicleSchema),
  deleteVehicle,
);

export default router;
