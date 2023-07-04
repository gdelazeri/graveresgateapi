import request from 'supertest';

import { connectDB, clearDB, disconnectDB } from '../../../mocks/database';
import routes from '../../../src/routes/index.routes';
import makeApp from '../../../mocks/makeApp';
import User from '../../../src/models/user.model';
import { ROUTE_MAP } from '../../../src/routes/index.routes';
import Permission from '../../../src/enum/user/UserPermission';
import { BAD_REQUEST, FORBIDDEN, NOT_FOUND, NO_CONTENT, OK } from 'http-status';
import { GenericErrorCodes, UserErrorCodes } from '../../../src/enum/ErrorCodes';
import Status from '../../../src/enum/user/UserStatus';
import { createAccessToken } from '../../../src/utils/JsonWebToken';

const api = makeApp('', routes);

// Mocks
const userObj = { name: "Teste user", email: 'teste@teste.com', password: 'teste123456' };
const userObj2 = { name: "Teste user 2", email: 'teste2@teste.com', password: 'teste123456' };

describe('src/routes/user.routes putUser', () => {
  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  test('update own user successfully', async () => {
    const { _id: userId, permission } = await User.create({ ...userObj });

    const jwtTokenUser = createAccessToken({ userId, permission });

    const res = await request(api)
      .put(ROUTE_MAP.USER_V1)
      .send({ name: 'New name' })
      .auth(jwtTokenUser, { type: "bearer" });

    const userUpdated = await User.findById(userId);

    expect(res.status).toEqual(NO_CONTENT);
    expect(userUpdated?.name).toEqual('New name');
    expect(userUpdated?.email).toEqual(userObj.email);
  });

  test('error on update user cause user not exists', async () => {
    const jwtTokenUser = createAccessToken({ userId: '64a471371c24992847d9968e', permission: Permission.VOLUNTARY });

    const res = await request(api)
    .put(ROUTE_MAP.USER_V1)
    .send({ name: 'New name' })
    .auth(jwtTokenUser, { type: "bearer" });

    expect(res.status).toEqual(NOT_FOUND);
    expect(res.body.error).toEqual(UserErrorCodes.UserInexistent);
  });

  test('error on update user cause some fields are invalid', async () => {
    const { _id: userId, permission } = await User.create({ ...userObj });

    const jwtTokenUser = createAccessToken({ userId, permission });

    const res = await request(api)
      .put(ROUTE_MAP.USER_V1)
      .send({ name: 'New name', permission: Permission.ADMIN })
      .auth(jwtTokenUser, { type: "bearer" });

    expect(res.status).toEqual(BAD_REQUEST);
    expect(res.body.error).toEqual(GenericErrorCodes.WrongFields);
  });
});