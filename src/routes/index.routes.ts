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
import Settings from './settings.routes';
import DriverChecklist from './driverChecklist.routes';
import RescuerChecklist from './rescuerChecklist.routes';
import RadioOperatorChecklist from './radioOperatorChecklist.routes';

export enum ROUTE_MAP {
  USER_V1 = '/v1/user',
  DUTY_REQUEST_V1 = '/v1/duty-request',
  DUTY_V1 = '/v1/duty',
  VEHICLE_V1 = '/v1/vehicle',
  COURSE_V1 = '/v1/course',
  VEHICLE_TRIP_V1 = '/v1/vehicle-trip',
  CHECKLIST_V1 = '/v1/checklist',
  DUTY_CARE_CHECKLIST_V1 = '/v1/duty-care-checklist',
  SETTING_V1 = '/v1/setting',
  DRIVER_CHECKLIST_V1 = '/v1/driver-checklist',
  RESCUER_CHECKLIST_V1 = '/v1/rescuer-checklist',
  RADIO_OPERATOR_CHECKLIST_V1 = '/v1/radio-operator-checklist',
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
routes.use(ROUTE_MAP.SETTING_V1, Settings);
routes.use(ROUTE_MAP.DRIVER_CHECKLIST_V1, DriverChecklist);
routes.use(ROUTE_MAP.RESCUER_CHECKLIST_V1, RescuerChecklist);
routes.use(ROUTE_MAP.RADIO_OPERATOR_CHECKLIST_V1, RadioOperatorChecklist);

export default routes;
