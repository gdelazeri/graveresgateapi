import { Request, Response } from 'express';
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  NO_CONTENT,
  OK,
  UNAUTHORIZED,
} from 'http-status';
import { UserErrorCodes } from '../enum/ErrorCodes';
import {
  createUser,
  updateUser,
  findUserByEmail,
  checkLogin,
  findUserById,
  softDeleteUser,
  generateTokens,
  findUsers,
  findLatestRegistrationId,
} from '../services/user.service';
import ResponseData from '../utils/ResponseData';
import {
  GetListUsers,
  LoginPayload,
  PostUserPayload,
  PutOwnUserPayload,
  PutUserPayload,
  UserIdParams,
} from '../interfaces/User';
import { User } from '../models/user.model';
import Status from '../enum/user/UserStatus';
import { generateRegistrationId } from '../utils/UserHelper';
import { isString } from 'lodash';
import Permission from '../enum/user/UserPermission';

export async function getOwnUser(req: Request, res: Response) {
  /* 	
    #swagger.tags = ['User']
    #swagger.description = 'Get data from user logged'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200'] = {
      schema: { $ref: "#/definitions/ResponseUser" }
    }
    #swagger.responses['404']
    #swagger.responses['500']
  */
  try {
    const { userId } = req;

    const user = await findUserById(userId);

    if (!user || ![Status.ACTIVE, Status.PENDING].includes(user.status)) {
      return res.sendStatus(NOT_FOUND);
    }

    return res.status(OK).send(new ResponseData(user));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function getUserById(req: Request, res: Response) {
  /* 	
    #swagger.tags = ['User']
    #swagger.description = 'Get data from user by id'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200'] = {
      schema: { $ref: "#/definitions/ResponseUser" }
    }
    #swagger.responses['404']
    #swagger.responses['500']
  */
  try {
    const {
      params: { id },
    } = req;

    const user = await findUserById(id);

    if (!user) {
      return res.sendStatus(NOT_FOUND);
    }

    const userData = { ...user, password: null };

    return res.status(OK).send(new ResponseData(userData));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function listActiveUsers(
  req: Request<unknown, unknown, unknown, GetListUsers>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['User']
    #swagger.description = 'List active users'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const { isLeader, isDriver, permission } = req.query;

    const filters: any = {}

    if (isString(isLeader)) {
      filters.isLeader = isLeader === 'true';
    }
    if (isString(isDriver)) {
      filters.isDriver = isDriver === 'true';
    }
    if (isString(permission) && permission in Permission) {
      filters.permission = permission;
    }

    const list = await findUsers([Status.ACTIVE], filters);

    return res.status(OK).send(new ResponseData(list));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function listAllUsers(
  req: Request<unknown, unknown, unknown, GetListUsers>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['User']
    #swagger.description = 'List all users'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const list = await findUsers([Status.ACTIVE, Status.PENDING, Status.SUSPENDED]);

    return res.status(OK).send(new ResponseData(list));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function postUser(
  req: Request<unknown, unknown, PostUserPayload>,
  res: Response,
) {
  /*
    #swagger.tags = ['User']
    #swagger.description = 'Register a new user'
    #swagger.parameters['payload'] = {
      in: 'body',
      required: true,
      type: 'object',
      schema: { $ref: "#/definitions/PostNewUser" }
    }
    #swagger.responses['200'] = {
      schema: { $ref: "#/definitions/ResponseLogin" }
    }
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const { body } = req;

    if (await findUserByEmail(body.email)) {
      return res
        .status(BAD_REQUEST)
        .send(new ResponseData(null, UserErrorCodes.EmailInUsage));
    }

    const user = await createUser(body);

    return res.status(OK).send(new ResponseData(generateTokens(user)));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function putUser(
  req: Request<UserIdParams, unknown, PutUserPayload>,
  res: Response,
) {
  /*
    #swagger.tags = ['User']
    #swagger.description = 'Update an user'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.parameters['id'] = {
      in: 'params',
      description: 'User id',
      required: true,
      type: 'string',
    }
    #swagger.parameters['payload'] = {
      in: 'body',
      required: true,
      type: 'object',
      schema: { $ref: "#/definitions/PutUser" }
    }
    #swagger.responses['204']
    #swagger.responses['404']
    #swagger.responses['500']
  */
  try {
    const {
      body,
      params: { id },
    } = req;

    const user = await findUserById(id);

    if (!user) {
      return res
        .status(NOT_FOUND)
        .send(new ResponseData(null, UserErrorCodes.UserInexistent));
    }

    if (user.registrationId === null && user.status === Status.PENDING && body.status === Status.ACTIVE) {
      const registration = await findLatestRegistrationId();
      body.registrationId = generateRegistrationId(registration?.registrationId);
    }

    await updateUser(id, body as unknown as User);

    return res.sendStatus(NO_CONTENT);
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function putOwnUser(
  req: Request<unknown, unknown, PutOwnUserPayload>,
  res: Response,
) {
  /*
    #swagger.tags = ['User']
    #swagger.description = 'Update the user logged'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.parameters['payload'] = {
      in: 'body',
      required: true,
      type: 'object',
      schema: { $ref: "#/definitions/PutOwnUser" }
    }
    #swagger.responses['204']
    #swagger.responses['404']
    #swagger.responses['500']
  */
  try {
    const { body, userId } = req;

    if (!(await findUserById(userId))) {
      return res
        .status(NOT_FOUND)
        .send(new ResponseData(null, UserErrorCodes.UserInexistent));
    }

    await updateUser(userId, body as User);

    return res.sendStatus(NO_CONTENT);
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function deleteUser(req: Request<UserIdParams>, res: Response) {
  /*
    #swagger.tags = ['User']
    #swagger.description = 'Delete an user'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.parameters['_id'] = {
      in: 'params',
      required: true,
      description: 'User id',
      type: 'string',
    }
    #swagger.responses['200']
    #swagger.responses['404']
    #swagger.responses['500']
  */
  try {
    const {
      params: { id },
      userId,
    } = req;

    if (!(await findUserById(id))) {
      return res
        .status(NOT_FOUND)
        .send(new ResponseData(null, UserErrorCodes.UserInexistent));
    }

    await softDeleteUser(id, userId);

    return res.sendStatus(OK);
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function postLogin(
  req: Request<unknown, unknown, LoginPayload>,
  res: Response,
) {
  /*
    #swagger.tags = ['User']
    #swagger.description = 'Delete an user'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.parameters['payload'] = {
      in: 'body',
      required: true,
      type: 'object',
      schema: { $ref: "#/definitions/PostLogin" }
    }
    #swagger.responses['200']
    #swagger.responses['401']
    #swagger.responses['500']
  */
  try {
    const { body } = req;

    const user = await checkLogin(body);

    if (!user) {
      return res
        .status(UNAUTHORIZED)
        .send(new ResponseData(null, UserErrorCodes.LoginInvalid));
    }

    return res.status(OK).send(new ResponseData(generateTokens(user)));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}
