import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import ResponseData from '../utils/ResponseData';
import { findAll } from '../services/course.service';

export async function list(
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response,
) {
  /* 	
    #swagger.tags = ['Course']
    #swagger.description = 'List courses'
    #swagger.security = [{ "Bearer": [ ] }]
    #swagger.responses['200']
    #swagger.responses['400']
    #swagger.responses['500']
  */
  try {
    const list = await findAll();

    return res.status(OK).send(new ResponseData(list));
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}
