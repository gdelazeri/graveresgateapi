import express from 'express';
import deserializeUser from '../middlewares/deserializeUser';
import User from './user.routes';
import DutyRequest from './dutyRequest.routes';

export enum ROUTE_MAP {
  USER_V1 = '/v1/user',
  DUTY_REQUEST_V1 = '/v1/duty-request',
}

const routes = express.Router();

// Middleware to extract userId and permission from access token
routes.use(deserializeUser);

// Routes
routes.use(ROUTE_MAP.USER_V1, User);
routes.use(ROUTE_MAP.DUTY_REQUEST_V1, DutyRequest);

export default routes;
