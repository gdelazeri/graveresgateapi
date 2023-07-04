import dotenv from 'dotenv';
dotenv.config();

export const DATABASE_CONNECTION_STRING = String(process.env.DATABASE_CONNECTION_STRING);

export const ACCESS_TOKEN_EXPIRES_IN = String(process.env.ACCESS_TOKEN_EXPIRES_IN);

export const REFRESH_TOKEN_EXPIRES_IN = String(process.env.REFRESH_TOKEN_EXPIRES_IN);

export const ACCESS_TOKEN_SECRET = String(process.env.ACCESS_TOKEN_SECRET);

export const PORT = process.env.PORT || 7100;