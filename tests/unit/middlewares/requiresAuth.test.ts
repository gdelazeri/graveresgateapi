import { NextFunction, Request, Response } from 'express';
import { FORBIDDEN, UNAUTHORIZED } from 'http-status';
import Permission from '../../../src/enum/user/UserPermission';
import requiresAuth from '../../../src/middlewares/requiresAuth';

describe('src/middlewares/requiresAuth.ts', () => {
  test('requires user data on access token', async () => {
    const userId = '1';
    const permission = Permission.ADMIN;
    const request = { userId, permission } as unknown as Request;
    const response = { sendStatus: jest.fn() } as unknown as Response;
    const next: NextFunction = jest.fn();

    requiresAuth([Permission.ADMIN])(request, response, next);

    expect(next).toHaveBeenCalled();
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
});