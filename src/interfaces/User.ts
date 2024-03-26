import * as core from 'express-serve-static-core';
import Permission from '../enum/user/UserPermission';

export interface UserIdParams extends core.ParamsDictionary {
  id: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface PostUserPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  birthDate: string;
  courseId: string;
}

export interface PutUserPayload {
  registrationId: string;
  name: string;
  email: string;
  phone: string;
  permission: string;
  status: string;
  isDriver: boolean;
  birthDate: string;
  courseId: string;
}

export interface PutOwnUserPayload {
  name: string;
  email: string;
}

export interface GetListUsers extends core.Query {
  isLeader?: string;
  isDriver?: string;
  permission?: Permission;
}
