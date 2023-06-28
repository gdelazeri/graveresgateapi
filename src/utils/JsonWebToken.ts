import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRES_IN, ACCESS_TOKEN_SECRET } from "../config/environment";

export function createAccessToken(object: object) {
  return jwt.sign(object, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

    return { valid: true, expired: false, decoded };
  } catch (error) {
    return {
      valid: false,
    };
  }
}