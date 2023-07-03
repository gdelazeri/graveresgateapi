import { NextFunction, Request, Response } from 'express';
import { FORBIDDEN, UNAUTHORIZED } from 'http-status';
import { string } from 'yup';
import Permission from '../../../src/enum/user/UserPermission';
import requiresAuth from '../../../src/middlewares/requiresAuth';
import { createAccessToken, decodeToken } from '../../../src/utils/JsonWebToken';

describe('src/utils/JsonWebToken.ts', () => {
  test('create access token and decode it', async () => {
    const userId = '1';
    const permission = Permission.ADMIN;

    const accessToken = createAccessToken({ userId, permission });
    const { valid, expired, decoded } = decodeToken(accessToken);

    expect(typeof accessToken).toBe('string');
    expect(decoded.userId).toEqual(userId);
    expect(decoded.permission).toEqual(permission);
    expect(valid).toBeTruthy();
    expect(expired).toBeFalsy();
  });

  test('create access token expired and decode it', async () => {
    const userId = '1';
    const permission = Permission.ADMIN;

    const accessToken = createAccessToken({ userId, permission }, '-10');
    const { valid, expired, decoded } = decodeToken(accessToken);

    expect(typeof accessToken).toBe('string');
    expect(decoded).toBeNull();
    expect(valid).toBeFalsy();
    expect(expired).toBeTruthy();
  });

  test('error on verify user data on access token without permission', async () => {
    const userId = '1';
    const permission = Permission.TRAINEE;
    const request = { userId, permission } as unknown as Request;
    const response = { sendStatus: jest.fn() } as unknown as Response;
    const next: NextFunction = jest.fn();

    requiresAuth([Permission.ADMIN])(request, response, next);

    expect(response.sendStatus).toHaveBeenCalledWith(FORBIDDEN);
  });

  test('error on verify user data on access token without user id', async () => {
    const permission = Permission.TRAINEE;
    const request = { permission } as unknown as Request;
    const response = { sendStatus: jest.fn() } as unknown as Response;
    const next: NextFunction = jest.fn();

    requiresAuth([Permission.ADMIN])(request, response, next);

    expect(response.sendStatus).toHaveBeenCalledWith(UNAUTHORIZED);
  });

  test('error on verify headers', async () => {
    const request = { } as unknown as Request;
    const response = { sendStatus: jest.fn() } as unknown as Response;
    const next: NextFunction = jest.fn();

    requiresAuth([])(request, response, next);

    expect(response.sendStatus).toHaveBeenCalledWith(UNAUTHORIZED);
  });
});