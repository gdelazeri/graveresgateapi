import express from 'express';
import deserializeUser from '../middlewares/deserializeUser';
import User from './user.routes';

export enum ROUTE_MAP {
  USER_V1 = '/v1/user',
}

const routes = express.Router();

// Middleware to extract userId and permission from access token
routes.use(deserializeUser);

// Routes
routes.use(ROUTE_MAP.USER_V1, User);

export default routes;
