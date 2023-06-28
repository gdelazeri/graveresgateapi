import express, { Request, Response, Express } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connect from './src/config/connect';
import deserializeUser from './src/middlewares/deserializeUser';
import userRoutes from './src/routes/user.routes';
import { NOT_FOUND } from 'http-status';

dotenv.config();

const router: Express = express();

// Access token data
router.use(deserializeUser);

// Logging
router.use(morgan('dev'));

// Parse the request
router.use(express.urlencoded({ extended: false }));

// Takes care of JSON data
router.use(express.json());

// Routes
router.use('/v1/user', userRoutes);

/* Error */
router.all('*', (req: Request, res: Response) => {
  res.sendStatus(NOT_FOUND);
});


// Server
const PORT: any = process.env.PORT ?? 6060;
router.listen(PORT, () => {
  connect();
  console.log(`The server is running on port ${PORT}`)
});
