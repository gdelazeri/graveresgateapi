import express, { Express } from 'express';
import morgan from 'morgan';

const router: Express = express();

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** Error handling */
router.use((req, res, next) => res.sendStatus(404));

/** Server */
const PORT: any = process.env.PORT ?? 6060;
router.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`)
});
