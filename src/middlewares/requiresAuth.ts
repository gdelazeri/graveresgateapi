import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { FORBIDDEN, UNAUTHORIZED } from 'http-status';
import Permission from '../enum/user/UserPermission';

const requiresAuth =
  (permissionsAuthorized: Permission[] = []) =>
  (req: Request, res: Response, next: NextFunction) => {
    const userId = get(req, 'userId') as unknown as string;
    const permission = get(req, 'permission') as unknown as Permission;

    if (!userId) {
      return res.sendStatus(UNAUTHORIZED);
    }

    if (permissionsAuthorized.length === 0) {
      return next();
    }

    if (!permissionsAuthorized.includes(permission)) {
      return res.sendStatus(FORBIDDEN);
    }

    return next();
  };

export default requiresAuth;
