import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { createAccessToken, decodeToken } from '../utils/JsonWebToken';
import Permission from '../enum/user/UserPermission';
import { checkValidUser } from '../services/user.service';
import { UNAUTHORIZED } from 'http-status';

declare global {
  namespace Express {
    export interface Request {
      userId: string;
      permission: Permission;
    }
  }
}

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    '',
  );
  const refreshToken = get(req, 'headers.x-refresh-token') as string;

  if (!accessToken) return next();

  const { decoded, expired } = decodeToken(accessToken);

  if (decoded) {
    req.userId = decoded.userId;
    req.permission = decoded.permission;

    return next();
  }

  if (expired && refreshToken) {
    const {
      valid,
      decoded: { userId },
    } = decodeToken(refreshToken);

    if (valid) {
      const user = await checkValidUser(userId);

      if (user) {
        const newAccessToken = createAccessToken({
          userId,
          permission: user.permission,
        });
        res.setHeader('x-access-token', newAccessToken);

        req.userId = userId;
        req.permission = user.permission;
        return next();
      }
    }
  }

  return res.sendStatus(UNAUTHORIZED);
};

export default deserializeUser;
