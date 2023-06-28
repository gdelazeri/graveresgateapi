import jwt, { JwtPayload } from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRES_IN, ACCESS_TOKEN_SECRET } from "../config/environment";
import Permission from "../enum/user/UserPermission";

export interface TokenPayload extends JwtPayload {
  userId: string;
  permission: Permission;
}

export function createAccessToken(object: TokenPayload) {
  return jwt.sign(object, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
}

export function decodeAccessToken(token: string) {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;

    return { valid: true, expired: false, decoded };
  } catch (error) {
    return {
      valid: false,
    };
  }
}