import { NextFunction, Request, Response } from 'express';
import { UNAUTHORIZED } from 'http-status';
import Permission from '../../../src/enum/user/UserPermission';
import deserializeUser from '../../../src/middlewares/deserializeUser';
import { createUser } from '../../../src/services/user.service';
import { createAccessToken, createRefreshToken } from '../../../src/utils/JsonWebToken';

import { connectDB, clearDB, disconnectDB } from '../../../mocks/database';

describe('src/middlewares/deserializeUser.ts', () => {
  describe('deserializeUser method', () => {
    beforeAll(async () => {
      await connectDB();
    });

    beforeEach(async () => {
      await clearDB();
    });

    afterAll(async () => {
      await disconnectDB();
    });

    test('deserialize user successfully with access token', async () => {
      const userId = '1';
      const permission = Permission.ADMIN;
      const accessToken = createAccessToken({ userId, permission });
      const request = { headers: { authorization: `Bearer ${accessToken}` } } as unknown as Request;
      const response = { sendStatus: jest.fn() } as unknown as Response;
      const next: NextFunction = jest.fn();

      await deserializeUser(request, response, next);

      expect(next).toHaveBeenCalled();
      expect(request.userId).toEqual(userId);
      expect(request.permission).toEqual(permission);
    });

    test('call next without access token', async () => {
      const request = { } as unknown as Request;
      const response = { sendStatus: jest.fn() } as unknown as Response;
      const next: NextFunction = jest.fn();

      await deserializeUser(request, response, next);

      expect(next).toHaveBeenCalled();
    });

    test('error on deserialize with access token expired', async () => {
      const userId = '1';
      const permission = Permission.ADMIN;
      const accessToken = createAccessToken({ userId, permission }, '0');
      const request = { headers: { authorization: `Bearer ${accessToken}` } } as unknown as Request;
      const response = { sendStatus: jest.fn() } as unknown as Response;
      const next: NextFunction = jest.fn();

      await deserializeUser(request, response, next);

      expect(response.sendStatus).toHaveBeenCalledWith(UNAUTHORIZED);
    });

    test('deserialize user with access token expired and refresh token valid', async () => {
      const userObj = {
        name: "Teste user",
        email: 'teste@teste.com',
        password: 'teste123456',
      };
      const { id, permission } = await createUser({ ...userObj });
      const accessToken = createAccessToken({ userId: id, permission }, '0');
      const refreshToken = createRefreshToken({ userId: id, permission });
      const request = {
        headers: {
          authorization: `Bearer ${accessToken}`,
          'x-refresh-token': refreshToken,
        }
      } as unknown as Request;
      const response = {
        sendStatus: jest.fn(),
        setHeader: jest.fn(),
        getHeaders: jest.fn(),
      } as unknown as Response;
      const next: NextFunction = jest.fn();

      await deserializeUser(request, response, next);
      
      expect(next).toHaveBeenCalled();
      expect(response.setHeader).toHaveBeenCalled();
    });

    test('error on deserialize user with access token expired and refresh token valid but user dont exists', async () => {
      const userId = '64a1fef12e5de326a3c1b900';
      const permission = Permission.ADMIN;
      const accessToken = createAccessToken({ userId, permission }, '0');
      const refreshToken = createRefreshToken({ userId, permission });
      const request = {
        headers: {
          authorization: `Bearer ${accessToken}`,
          'x-refresh-token': refreshToken,
        }
      } as unknown as Request;
      const response = {
        sendStatus: jest.fn(),
        setHeader: jest.fn(),
      } as unknown as Response;
      const next: NextFunction = jest.fn();

      await deserializeUser(request, response, next);
      
      expect(response.sendStatus).toHaveBeenCalledWith(UNAUTHORIZED);
    });
  });
});