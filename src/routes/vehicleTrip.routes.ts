import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import {
  getByIdSchema,
  listByVehicleSchema,
  postVehicleTripSchema,
  putVehicleTripSchema,
} from '../schemas/vehicleTrip.schema';
import requiresAuth from '../middlewares/requiresAuth';
import {
  postVehicleTrip,
  putVehicleTrip,
  list,
  getById
} from '../controllers/vehicleTrip.controller';

const router = express.Router();

router.get(
  '/getById/:id',
  requiresAuth([]),
  validateRequest(getByIdSchema),
  getById,
);

router.get(
  '/listByVehicle/:vehicleId',
  requiresAuth([]),
  validateRequest(listByVehicleSchema),
  list,
);

router.post(
  '',
  requiresAuth([]),
  validateRequest(postVehicleTripSchema),
  postVehicleTrip,
);

router.put(
  '/:id',
  requiresAuth([]),
  validateRequest(putVehicleTripSchema),
  putVehicleTrip,
);

export default router;
