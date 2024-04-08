import express from 'express';
import deserializeUser from '../middlewares/deserializeUser';
import User from './user.routes';
import DutyRequest from './dutyRequest.routes';
import Duty from './duty.routes';
import Vehicle from './vehicle.routes';
import Course from './course.routes';
import VehicleTrip from './vehicleTrip.routes';
import Checklist from './checklist.routes';
import DutyCareChecklist from './dutyCareChecklist.routes';

export enum ROUTE_MAP {
  USER_V1 = '/v1/user',
  DUTY_REQUEST_V1 = '/v1/duty-request',
  DUTY_V1 = '/v1/duty',
  VEHICLE_V1 = '/v1/vehicle',
  COURSE_V1 = '/v1/course',
  VEHICLE_TRIP_V1 = '/v1/vehicle-trip',
  CHECKLIST_V1 = '/v1/checklist',
  DUTY_CARE_CHECKLIST_V1 = '/v1/duty-care-checklist',
}

const routes = express.Router();

// Middleware to extract userId and permission from access token
routes.use(deserializeUser);

// Routes
routes.use(ROUTE_MAP.USER_V1, User);
routes.use(ROUTE_MAP.DUTY_REQUEST_V1, DutyRequest);
routes.use(ROUTE_MAP.DUTY_V1, Duty);
routes.use(ROUTE_MAP.VEHICLE_V1, Vehicle);
routes.use(ROUTE_MAP.COURSE_V1, Course);
routes.use(ROUTE_MAP.VEHICLE_TRIP_V1, VehicleTrip);
routes.use(ROUTE_MAP.CHECKLIST_V1, Checklist);
routes.use(ROUTE_MAP.DUTY_CARE_CHECKLIST_V1, DutyCareChecklist);

export default routes;
