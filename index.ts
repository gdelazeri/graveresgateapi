import express, { Request, Response, Express } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { NOT_FOUND } from 'http-status';
import connect from './src/config/connect';
import { PORT } from './src/config/environment';
import swaggerFile from './swagger_output.json';
import routes from './src/routes/index.routes';

const app: Express = express();

// Logging
app.use(morgan('dev'));

// Parse the request
app.use(express.urlencoded({ extended: false }));

// Takes care of JSON data
app.use(express.json());

// Routes
app.use(routes)

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Error
app.all('*', (req: Request, res: Response) => {
  res.sendStatus(NOT_FOUND);
});

// Server
app.listen(PORT, () => {
  connect();
  console.log(`The server is running on port ${PORT}`)
});
