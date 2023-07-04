import express, { Router } from 'express';
import bodyParser from 'body-parser';

const makeApp = (path: string, router: Router) => {
  const app = express();

  app.use(bodyParser.json());
  app.use(path, router);

  return app;
};

export default makeApp;
