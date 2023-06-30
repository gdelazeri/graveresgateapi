import jwt, { JwtPayload } from "jsonwebtoken";
import { Error } from "mongoose";
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN, ACCESS_TOKEN_SECRET } from "../config/environment";
import Permission from "../enum/user/UserPermission";

export interface AccessTokenPayload extends JwtPayload {
  userId: string;
  permission: Permission;
}

export interface RefreshTokenPayload extends JwtPayload {
  userId: string;
}

export function createAccessToken(object: AccessTokenPayload) {
  return jwt.sign(object, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
}

export function createRefreshToken(object: RefreshTokenPayload) {
  return jwt.sign(object, ACCESS_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
}

export function decodeToken(token: string) {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as any;

    return { valid: true, expired: false, decoded };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}