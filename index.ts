import express, { Request, Response, Express } from 'express';
import morgan from 'morgan';
import "reflect-metadata"
import swaggerUi from 'swagger-ui-express';
import { NOT_FOUND } from 'http-status';
import { PORT } from './src/config/environment';
import swaggerFile from './swagger_output.json';
import routes from './src/routes/index.routes';
import dataSource from './src/models';
import log from './src/config/log';

async function connectDatabase() {
	log.info(`Checking database connection...`);
	try {
		await dataSource.initialize();
		log.info('Database connection OK!');
	} catch (error: any) {
		log.error('Unable to connect to the database');
		log.error(error.message);
		process.exit(1);
	}
}

async function init() {
	log.info(`Starting API on port ${PORT}...`);

  const app: Express = express();

  // Logging
  app.use(morgan('dev'));

	await connectDatabase();

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

	app.listen(PORT, () => {
    log.info(`The API is running on port ${PORT}`)
	});
}

init()