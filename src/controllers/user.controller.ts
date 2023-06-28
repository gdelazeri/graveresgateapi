import { Request, Response } from 'express';
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR } from 'http-status';
import { UserErrorCodes } from '../enum/ErrorCodes';
import { createUser, findUserByEmail } from '../services/user.service';
import ResponseData from '../utils/ResponseData';

export async function postUser(req: Request, res: Response) {
  try {
    const { body } = req;

    if (await findUserByEmail(body.email)) {
      return res.status(BAD_REQUEST).send(
        new ResponseData(null, UserErrorCodes.UserExistent)
      );
    }
  
    await createUser({ ...body });
  
    return res.sendStatus(CREATED);
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}