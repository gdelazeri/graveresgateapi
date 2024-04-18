import dotenv from 'dotenv';
dotenv.config();

export const DATABASE_HOST = String(process.env.DATABASE_HOST);

export const DATABASE_NAME = String(process.env.DATABASE_NAME);

export const DATABASE_USERNAME = String(process.env.DATABASE_USERNAME);

export const DATABASE_PASSWORD = String(process.env.DATABASE_PASSWORD);

export const ACCESS_TOKEN_EXPIRES_IN = String(
  process.env.ACCESS_TOKEN_EXPIRES_IN,
);

export const REFRESH_TOKEN_EXPIRES_IN = String(
  process.env.REFRESH_TOKEN_EXPIRES_IN,
);

export const ACCESS_TOKEN_SECRET = String(process.env.ACCESS_TOKEN_SECRET);

export const PORT = process.env.PORT || 7100;
