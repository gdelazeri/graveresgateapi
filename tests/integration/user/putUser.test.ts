import request from 'supertest';

import { connectDB, clearDB, disconnectDB } from '../../../mocks/database';
import routes from '../../../src/routes/index.routes';
import makeApp from '../../../mocks/makeApp';
import { createUser, findUserById } from '../../../src/services/user.service';
import { ROUTE_MAP } from '../../../src/routes/index.routes';
import Permission from '../../../src/enum/user/UserPermission';
import { BAD_REQUEST, FORBIDDEN, NOT_FOUND, NO_CONTENT, OK } from 'http-status';
import { GenericErrorCodes } from '../../../src/enum/ErrorCodes';
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

  test('update user successfully', async () => {
    const { id: userId, permission } = await createUser({ ...userObj, permission: Permission.ADMIN });
    const { id } = await createUser({ ...userObj2 });

    const jwtTokenUser = createAccessToken({ userId, permission });

    const res = await request(api)
      .put(`${ROUTE_MAP.USER_V1}/${id}`)
      .send({ status: Status.ACTIVE, permission: Permission.VOLUNTARY })
      .auth(jwtTokenUser, { type: "bearer" });

    const userUpdated = await findUserById(id);

    expect(res.status).toEqual(NO_CONTENT);
    expect(userUpdated?.status).toEqual(Status.ACTIVE);
    expect(userUpdated?.permission).toEqual(Permission.VOLUNTARY);
  });

  test('error on update user cause user logged is not an admin', async () => {
    const { id: userId, permission } = await createUser({ ...userObj });

    const jwtTokenUser = createAccessToken({ userId, permission });

    const res = await request(api)
      .put(`${ROUTE_MAP.USER_V1}/64a471371c24992847d9968e`)
      .send({ status: Status.ACTIVE, permission: Permission.VOLUNTARY })
      .auth(jwtTokenUser, { type: "bearer" });

    expect(res.status).toEqual(FORBIDDEN);
  });

  test('error on update user cause user not exists', async () => {
    const { id: userId, permission } = await createUser({ ...userObj, permission: Permission.ADMIN });

    const jwtTokenUser = createAccessToken({ userId, permission });

    const res = await request(api)
      .put(`${ROUTE_MAP.USER_V1}/64a471371c24992847d9968e`)
      .send({ status: Status.ACTIVE, permission: Permission.VOLUNTARY })
      .auth(jwtTokenUser, { type: "bearer" });

    expect(res.status).toEqual(NOT_FOUND);
  });

  test('error on update user cause some fields are invalid', async () => {
    const { id: userId, permission } = await createUser({ ...userObj, permission: Permission.ADMIN });
    const { id } = await createUser({ ...userObj2 });

    const jwtTokenUser = createAccessToken({ userId, permission });

    const res = await request(api)
      .put(`${ROUTE_MAP.USER_V1}/${id}`)
      .send({ status: Status.ACTIVE, permission: Permission.VOLUNTARY, password: 'newpassword123' })
      .auth(jwtTokenUser, { type: "bearer" });

    expect(res.status).toEqual(BAD_REQUEST);
    expect(res.body.error).toEqual(GenericErrorCodes.WrongFields);
  });
});