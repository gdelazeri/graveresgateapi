import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { decodeAccessToken } from '../utils/JsonWebToken';

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
    // @ts-ignore
    req.userId = decoded.userId;
    // @ts-ignore
    req.permission = decoded.permission;

    return next();
  }

  return next();
};

export default deserializeUser;