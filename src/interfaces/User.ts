import * as core from 'express-serve-static-core';

export interface UserIdParams extends core.ParamsDictionary {
  _id: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface PostUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface PutUserPayload {
  registrationId: string;
  name: string;
  email: string;
  permission: string;
  status: string;
}

export interface PutOwnUserPayload {
  name: string;
  email: string;
}
