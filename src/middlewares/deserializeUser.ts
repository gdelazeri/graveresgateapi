import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { decodeAccessToken } from '../utils/JsonWebToken';
import Permission from "../enum/user/UserPermission";

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
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) return next();

  const { decoded } = decodeAccessToken(accessToken);

  if (decoded) {
    req.userId = decoded.userId;
    req.permission = decoded.permission;

    return next();
  }

  return next();
};

export default deserializeUser;