import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import {
  getByIdSchema,
  listSchema,
  postVehicleTripSchema,
  putVehicleTripSchema,
} from '../schemas/vehicleTrip.schema';
import requiresAuth from '../middlewares/requiresAuth';
import {
  postVehicleTrip,
  putVehicleTrip,
  list,
  getById,
} from '../controllers/vehicleTrip.controller';
import Permission from '../enum/user/UserPermission';

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
  validateRequest(listSchema),
  list,
);

router.post(
  '',
  requiresAuth([Permission.ADMIN, Permission.VOLUNTARY]),
  validateRequest(postVehicleTripSchema),
  postVehicleTrip,
);

router.put(
  '/:id',
  requiresAuth([Permission.ADMIN]),
  validateRequest(putVehicleTripSchema),
  putVehicleTrip,
);

export default router;
