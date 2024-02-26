import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';
import log from '../config/log';
import { BAD_REQUEST } from 'http-status';
import ResponseData from '../utils/ResponseData';
import { GenericErrorCodes } from '../enum/ErrorCodes';

const validateRequest =
  (schema: AnySchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.validateSync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (e) {
      log.error(e);
      return res
        .status(BAD_REQUEST)
        .send(new ResponseData(null, GenericErrorCodes.WrongFields));
    }
  };

export default validateRequest;
