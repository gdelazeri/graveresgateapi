import * as core from 'express-serve-static-core';

export interface UserIdParams extends core.ParamsDictionary {
  _id: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
