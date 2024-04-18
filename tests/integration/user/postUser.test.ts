import request from 'supertest';

import { connectDB, clearDB, disconnectDB } from '../../../mocks/database';
import routes from '../../../src/routes/index.routes';
import makeApp from '../../../mocks/makeApp';
import { createUser, findUserByEmail } from '../../../src/services/user.service';
import { ROUTE_MAP } from '../../../src/routes/index.routes';
import Permission from '../../../src/enum/user/UserPermission';
import { BAD_REQUEST, OK } from 'http-status';
import { GenericErrorCodes, UserErrorCodes } from '../../../src/enum/ErrorCodes';
import Status from '../../../src/enum/user/UserStatus';

const api = makeApp('', routes);

// Mocks
const userObj = { name: "Teste user", email: 'teste@teste.com', password: 'teste123456' };

describe('src/routes/user.routes postUser', () => {
  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  test('create user successfully', async () => {
    const res = await request(api)
      .post(ROUTE_MAP.USER_V1)
      .send({ ...userObj });

    const userCreated = await findUserByEmail(userObj.email);

    expect(res.status).toEqual(OK);
    expect(res.body.result.accessToken).toBeDefined();
    expect(res.body.result.refreshToken).toBeDefined();
    expect(userCreated?.name).toEqual(userObj.name);
  });

  test('error on create user cause there are not acceptable fields', async () => {
    const res = await request(api)
      .post(ROUTE_MAP.USER_V1)
      .send({ ...userObj, permission: Permission.ADMIN, status: Status.ACTIVE });

    expect(res.status).toEqual(BAD_REQUEST);
    expect(res.body.error).toEqual(GenericErrorCodes.WrongFields);
  });

  test('error on create user cause already exists another user with the same email', async () => {
    await createUser({ ...userObj });

    const res = await request(api)
      .post(ROUTE_MAP.USER_V1)
      .send({ ...userObj });

    expect(res.status).toEqual(BAD_REQUEST);
    expect(res.body.error).toEqual(UserErrorCodes.EmailInUsage);
  });
});