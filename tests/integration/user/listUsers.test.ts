import request from 'supertest';

import { connectDB, clearDB, disconnectDB } from '../../../mocks/database';
import routes from '../../../src/routes/index.routes';
import makeApp from '../../../mocks/makeApp';
import { createUser } from '../../../src/services/user.service';
import { ROUTE_MAP } from '../../../src/routes/index.routes';
import { createAccessToken } from '../../../src/utils/JsonWebToken';
import Permission from '../../../src/enum/user/UserPermission';
import { BAD_REQUEST, FORBIDDEN, OK } from 'http-status';
import { GenericErrorCodes } from '../../../src/enum/ErrorCodes';

const api = makeApp('', routes);

// Mocks
const userObj = { name: "Teste user", email: 'teste@teste.com', password: 'teste123456', permission: Permission.ADMIN };
const userObj2 = { name: "Teste user 2", email: 'teste2@teste.com', password: 'teste123456', permission: Permission.VOLUNTARY };

describe('src/routes/user.routes listUsers', () => {
  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  test('list users successfully', async () => {
    const { id: userId, permission } = await createUser({ ...userObj });
    await createUser({ ...userObj2 });
    
    const jwtTokenUser = createAccessToken({ userId, permission });

    const res = await request(api)
      .get(`${ROUTE_MAP.USER_V1}/list?pageNumber=1&pageSize=20`)
      .auth(jwtTokenUser, { type: "bearer" });

    expect(res.status).toEqual(OK);
    expect(res.body.result).toHaveLength(2);
  });

  test('list users successfully with pageSize = 1', async () => {
    const { id: userId, permission } = await createUser({ ...userObj });
    await createUser({ ...userObj2 });
    
    const jwtTokenUser = createAccessToken({ userId, permission });

    const res = await request(api)
      .get(`${ROUTE_MAP.USER_V1}/list?pageNumber=1&pageSize=1`)
      .auth(jwtTokenUser, { type: "bearer" });

    expect(res.status).toEqual(OK);
    expect(res.body.result).toHaveLength(1);
  });

  test('error on list users due to permission', async () => {
    await createUser({ ...userObj });
    const { id: userId, permission } = await createUser({ ...userObj2 });
    
    const jwtTokenUser = createAccessToken({ userId, permission });

    const res = await request(api)
      .get(`${ROUTE_MAP.USER_V1}/list?pageNumber=1&pageSize=20`)
      .auth(jwtTokenUser, { type: "bearer" });

    expect(res.status).toEqual(FORBIDDEN);
  });

  test('error on list users cause pageNumber is wrong', async () => {
    const { id: userId, permission } = await createUser({ ...userObj });
    
    const jwtTokenUser = createAccessToken({ userId, permission });

    const res = await request(api)
      .get(`${ROUTE_MAP.USER_V1}/list?pageNumber=0&pageSize=20`)
      .auth(jwtTokenUser, { type: "bearer" });

    expect(res.status).toEqual(BAD_REQUEST);
    expect(res.body.error).toEqual(GenericErrorCodes.PaginationInvalid);
  });

  test('error on list users cause pageSize is wrong', async () => {
    const { id: userId, permission } = await createUser({ ...userObj });
    
    const jwtTokenUser = createAccessToken({ userId, permission });

    const res = await request(api)
      .get(`${ROUTE_MAP.USER_V1}/list?pageNumber=1&pageSize=30`)
      .auth(jwtTokenUser, { type: "bearer" });

    expect(res.status).toEqual(BAD_REQUEST);
    expect(res.body.error).toEqual(GenericErrorCodes.PaginationInvalid);
  });

  test('error on list users cause is missing query params', async () => {
    const { id: userId, permission } = await createUser({ ...userObj });
    
    const jwtTokenUser = createAccessToken({ userId, permission });

    const res = await request(api)
      .get(`${ROUTE_MAP.USER_V1}/list`)
      .auth(jwtTokenUser, { type: "bearer" });

    expect(res.status).toEqual(BAD_REQUEST);
    expect(res.body.error).toEqual(GenericErrorCodes.WrongFields);
  });
});