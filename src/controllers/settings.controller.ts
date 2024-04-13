import { Request, Response } from 'express';
import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
} from 'http-status';
import ResponseData from '../utils/ResponseData';
import { getSettingValue } from '../services/settings.service';
import { GetSettingParams } from '../interfaces/Setting';
import { SettingErrorCodes } from '../enum/ErrorCodes';

export async function getSetting(
  req: Request<GetSettingParams, unknown, unknown>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['Settings']
    #swagger.description = 'get setting value by key'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const { key } = req.params;

    const setting = await getSettingValue(key)
    
    if (setting) {
      return res.status(OK).send(new ResponseData(setting.value));
    }

    return res.status(NOT_FOUND).send(new ResponseData(null, SettingErrorCodes.NotFound));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}
