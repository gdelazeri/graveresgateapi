import express, { Request, Response, Express } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { NOT_FOUND } from 'http-status';
import connect from './src/config/connect';
import deserializeUser from './src/middlewares/deserializeUser';
import { PORT } from './src/config/environment';
import userRoutes from './src/routes/user.routes';
import swaggerFile from './swagger_output.json';

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

// Swagger
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Error
router.all('*', (req: Request, res: Response) => {
  res.sendStatus(NOT_FOUND);
});

// Server
router.listen(PORT, () => {
  connect();
  console.log(`The server is running on port ${PORT}`)
});
