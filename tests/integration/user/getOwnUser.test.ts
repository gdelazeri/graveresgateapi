import request from 'supertest';

import { connectDB, clearDB, disconnectDB } from '../../../mocks/database';
import routes from '../../../src/routes/index.routes';
import makeApp from '../../../mocks/makeApp';
import { createUser } from '../../../src/services/user.service';
import { ROUTE_MAP } from '../../../src/routes/index.routes';
import { createAccessToken } from '../../../src/utils/JsonWebToken';
import Permission from '../../../src/enum/user/UserPermission';
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK, UNAUTHORIZED } from 'http-status';

const api = makeApp('', routes);

describe('src/routes/user.routes getOwnUser', () => {
  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  test('get user data logged', async () => {
    const userObj = {
      name: "Teste user",
      email: 'teste@teste.com',
      password: 'teste123456',
    };
    const { id: userId, permission, status, isDriver } = await createUser({ ...userObj });
    
    const jwtTokenUser = createAccessToken({ userId, permission });

    const res = await request(api)
      .get(ROUTE_MAP.USER_V1)
      .auth(jwtTokenUser, { type: "bearer" });

    expect(res.status).toEqual(OK);
    expect(res.body.result.name).toEqual(userObj.name);
    expect(res.body.result.email).toEqual(userObj.email);
    expect(res.body.result.permission).toEqual(permission);
    expect(res.body.result.status).toEqual(status);
    expect(res.body.result.isDriver).toEqual(isDriver);
  });

  test('error on get user data without token access', async () => {
    const userObj = {
      name: "Teste user",
      email: 'teste@teste.com',
      password: 'teste123456',
    };
    await createUser({ ...userObj });

    const res = await request(api)
      .get(ROUTE_MAP.USER_V1);

    expect(res.status).toEqual(UNAUTHORIZED);
  });

  test('error on get user data from inexistent user', async () => {
    const jwtTokenUser = createAccessToken({ userId: '64a471371c24992847d9968e', permission: Permission.ADMIN });

    const res = await request(api)
      .get(ROUTE_MAP.USER_V1)
      .auth(jwtTokenUser, { type: "bearer" });

    expect(res.status).toEqual(NOT_FOUND);
  });

  test('error on get user data with an invalid user id', async () => {
    const jwtTokenUser = createAccessToken({ userId: '123', permission: Permission.ADMIN });

    const res = await request(api)
      .get(ROUTE_MAP.USER_V1)
      .auth(jwtTokenUser, { type: "bearer" });

    expect(res.status).toEqual(INTERNAL_SERVER_ERROR);
  });
});