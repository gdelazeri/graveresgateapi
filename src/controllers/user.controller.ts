import { Request, Response } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, NO_CONTENT, OK, UNAUTHORIZED } from 'http-status';
import { UserErrorCodes } from '../enum/ErrorCodes';
import { createUser, updateUser, findUserByEmail, checkLogin, findUserById, softDeleteUser, generateTokens } from '../services/user.service';
import ResponseData from '../utils/ResponseData';
import { LoginPayload, PostUserPayload, PutOwnUserPayload, PutUserPayload, UserIdParams } from '../interfaces/User';

export async function postUser(req: Request<unknown, unknown, PostUserPayload>, res: Response) {
  try {
    const { body } = req;

    if (await findUserByEmail(body.email)) {
      return res.status(BAD_REQUEST).send(
        new ResponseData(null, UserErrorCodes.EmailInUsage)
      );
    }
  
    const user = await createUser(body);
  
    return res.status(OK).send(
      new ResponseData(generateTokens(user))
    );
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function putUser(req: Request<UserIdParams, unknown, PutUserPayload>, res: Response) {
  try {
    const { body, params: { _id } } = req;

    if (!await findUserById(_id)) {
      return res.status(NOT_FOUND).send(
        new ResponseData(null, UserErrorCodes.UserInexistent)
      );
    }
  
    await updateUser(_id, body);
  
    return res.sendStatus(NO_CONTENT);
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function putOwnUser(req: Request<unknown, unknown, PutOwnUserPayload>, res: Response) {
  try {
    const { body, userId } = req;

    if (!await findUserById(userId)) {
      return res.status(NOT_FOUND).send(
        new ResponseData(null, UserErrorCodes.UserInexistent)
      );
    }
  
    await updateUser(userId, body);
  
    return res.sendStatus(NO_CONTENT);
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function deleteUser(req: Request<UserIdParams>, res: Response) {
  try {
    const { params: { _id } } = req;

    if (!await findUserById(_id)) {
      return res.status(NOT_FOUND).send(
        new ResponseData(null, UserErrorCodes.UserInexistent)
      );
    }
  
    await softDeleteUser(_id);
  
    return res.sendStatus(OK);
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function postLogin(req: Request<unknown, unknown, LoginPayload>, res: Response) {
  try {
    const { body } = req;

    const user = await checkLogin(body);

    if (!user) {
      return res.status(UNAUTHORIZED).send(
        new ResponseData(null, UserErrorCodes.LoginInvalid)
      );
    }

    return res.status(OK).send(
      new ResponseData(generateTokens(user))
    );
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}
