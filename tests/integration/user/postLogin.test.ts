import request from 'supertest';

import { connectDB, clearDB, disconnectDB } from '../../../mocks/database';
import routes from '../../../src/routes/index.routes';
import makeApp from '../../../mocks/makeApp';
import { createUser } from '../../../src/services/user.service';
import { ROUTE_MAP } from '../../../src/routes/index.routes';
import { OK, UNAUTHORIZED } from 'http-status';
import { UserErrorCodes } from '../../../src/enum/ErrorCodes';

const api = makeApp('', routes);

// Mocks
const userObj = { name: "Teste user", email: 'teste@teste.com', password: 'teste123456' };

describe('src/routes/user.routes deleteUser', () => {
  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  test('login successfully', async () => {
    await createUser({ ...userObj });

    const res = await request(api)
      .post(`${ROUTE_MAP.USER_V1}/login`)
      .send({ email: userObj.email, password: userObj.password });

    expect(res.status).toEqual(OK);
    expect(res.body.result.accessToken).toBeDefined();
    expect(res.body.result.refreshToken).toBeDefined();
  });

  test('error on login cause password is wrong', async () => {
    await createUser({ ...userObj });

    const res = await request(api)
      .post(`${ROUTE_MAP.USER_V1}/login`)
      .send({ email: userObj.email, password: '123456' });

    expect(res.status).toEqual(UNAUTHORIZED);
    expect(res.body.error).toEqual(UserErrorCodes.LoginInvalid);
  });

  test('error on login cause email is wrong', async () => {
    await createUser({ ...userObj });

    const res = await request(api)
      .post(`${ROUTE_MAP.USER_V1}/login`)
      .send({ email: '123@teste.com', password: userObj.password });

    expect(res.status).toEqual(UNAUTHORIZED);
    expect(res.body.error).toEqual(UserErrorCodes.LoginInvalid);
  });});