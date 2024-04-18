import * as core from 'express-serve-static-core';

export interface GetSettingParams extends core.ParamsDictionary {
  key: string;
}
