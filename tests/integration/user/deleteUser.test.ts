import request from 'supertest';

import { connectDB, clearDB, disconnectDB } from '../../../mocks/database';
import routes from '../../../src/routes/index.routes';
import makeApp from '../../../mocks/makeApp';
import { createUser, findUserById } from '../../../src/services/user.service';
import { ROUTE_MAP } from '../../../src/routes/index.routes';
import Permission from '../../../src/enum/user/UserPermission';
import { FORBIDDEN, NOT_FOUND, OK } from 'http-status';
import Status from '../../../src/enum/user/UserStatus';
import { createAccessToken } from '../../../src/utils/JsonWebToken';

const api = makeApp('', routes);

// Mocks
const userObj = { name: "Teste user", email: 'teste@teste.com', password: 'teste123456' };
const userObj2 = { name: "Teste user 2", email: 'teste2@teste.com', password: 'teste123456' };

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

  test('delete user successfully', async () => {
    const { id: userId, permission } = await createUser({ ...userObj, permission: Permission.ADMIN });
    const { id } = await createUser({ ...userObj2 });

    const jwtTokenUser = createAccessToken({ userId, permission });

    const res = await request(api)
      .delete(`${ROUTE_MAP.USER_V1}/${id}`)
      .auth(jwtTokenUser, { type: "bearer" });

    const userDeleted = await findUserById(id);

    expect(res.status).toEqual(OK);
    expect(userDeleted?.status).toEqual(Status.DELETED);
    expect(userDeleted?.deletedAt).toBeDefined();
    expect(userDeleted?.deletedBy).toEqual(userId.toString());
  });

  test('error on update user cause user logged is not an admin', async () => {
    const { id: userId, permission } = await createUser({ ...userObj });

    const jwtTokenUser = createAccessToken({ userId, permission });

    const res = await request(api)
      .delete(`${ROUTE_MAP.USER_V1}/64a471371c24992847d9968e`)
      .auth(jwtTokenUser, { type: "bearer" });

    expect(res.status).toEqual(FORBIDDEN);
  });

  test('error on delete user cause user not exists', async () => {
    const { id: userId, permission } = await createUser({ ...userObj, permission: Permission.ADMIN });

    const jwtTokenUser = createAccessToken({ userId, permission });

    const res = await request(api)
      .delete(`${ROUTE_MAP.USER_V1}/64a471371c24992847d9968e`)
      .auth(jwtTokenUser, { type: "bearer" });

    expect(res.status).toEqual(NOT_FOUND);
  });
});