import { Request, Response } from 'express';
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from 'http-status';
import { UserErrorCodes } from '../enum/ErrorCodes';
import LoginRequest from '../interfaces/LoginRequest';
import { createUser, findUserByEmail, checkLogin } from '../services/user.service';
import ResponseData from '../utils/ResponseData';
import { createAccessToken } from '../utils/JsonWebToken';

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

export async function postLogin(req: Request<unknown, unknown, LoginRequest>, res: Response) {
  try {
    const { body } = req;

    const user = await checkLogin(body);

    if (!user) {
      return res.status(UNAUTHORIZED).send(new ResponseData(null, UserErrorCodes.LoginInvalid));
    }

    const token = createAccessToken({
      userId: user._id,
      permission: user.permission,
    });

    return res.status(OK).send(new ResponseData({ token }));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}