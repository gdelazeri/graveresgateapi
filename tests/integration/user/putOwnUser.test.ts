import request from 'supertest';

import { connectDB, clearDB, disconnectDB } from '../../../mocks/database';
import routes from '../../../src/routes/index.routes';
import makeApp from '../../../mocks/makeApp';
import { createUser, findUserById } from '../../../src/services/user.service';
import { ROUTE_MAP } from '../../../src/routes/index.routes';
import Permission from '../../../src/enum/user/UserPermission';
import { BAD_REQUEST, NOT_FOUND, NO_CONTENT } from 'http-status';
import { GenericErrorCodes, UserErrorCodes } from '../../../src/enum/ErrorCodes';
import { createAccessToken } from '../../../src/utils/JsonWebToken';

const api = makeApp('', routes);

// Mocks
const userObj = { name: "Teste user", email: 'teste@teste.com', password: 'teste123456' };

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
    const { id: userId, permission } = await createUser({ ...userObj });

    const jwtTokenUser = createAccessToken({ userId, permission });

    const res = await request(api)
      .put(ROUTE_MAP.USER_V1)
      .send({ name: 'New name' })
      .auth(jwtTokenUser, { type: "bearer" });

    const userUpdated = await findUserById(userId);

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
    const { id: userId, permission } = await createUser({ ...userObj });

    const jwtTokenUser = createAccessToken({ userId, permission });

    const res = await request(api)
      .put(ROUTE_MAP.USER_V1)
      .send({ name: 'New name', permission: Permission.ADMIN })
      .auth(jwtTokenUser, { type: "bearer" });

    expect(res.status).toEqual(BAD_REQUEST);
    expect(res.body.error).toEqual(GenericErrorCodes.WrongFields);
  });
});