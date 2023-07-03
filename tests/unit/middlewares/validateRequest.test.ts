import { number, object, string } from "yup";
import { NextFunction, Request, Response } from 'express';
import validateRequest from '../../../src/middlewares/validateRequest';
import { BAD_REQUEST } from "http-status";
import ResponseData from "../../../src/utils/ResponseData";
import { GenericErrorCodes } from "../../../src/enum/ErrorCodes";

describe('src/middlewares/validateRequest.ts', () => {
  test('validate request with body', async () => {
    const request = {
      body: {
        name: 'Teste de nome',
        email: 'teste@email.com',
      }
    } as unknown as Request;
    const response = { } as unknown as Response;
    const next: NextFunction = jest.fn();

    const bodySchema = object({
      body: object({
        name: string().required(),
        email: string().required(),
      }).noUnknown(true).strict()
    });

    validateRequest(bodySchema)(request, response, next);

    expect(next).toHaveBeenCalled();
  });

  test('error on validate request with body', async () => {
    const request = {
      body: {
        name: 'Teste de nome',
      }
    } as unknown as Request;
    const response = { } as unknown as Response;
    response.send = jest.fn();
    response.status = jest.fn(() => response);
    const next: NextFunction = jest.fn();

    const bodySchema = object({
      body: object({
        name: string().required(),
        email: string().required(),
      }).noUnknown(true).strict()
    });

    validateRequest(bodySchema)(request, response, next);

    expect(response.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(response.send).toHaveBeenCalledWith(new ResponseData(null, GenericErrorCodes.WrongFields));
  });

  test('validate request with query', async () => {
    const request = {
      query: {
        pageSize: 1,
      }
    } as unknown as Request;
    const response = { } as unknown as Response;
    const next: NextFunction = jest.fn();

    const bodySchema = object({
      query: object({
        pageSize: number().required(),
      }).noUnknown(true).strict()
    });

    validateRequest(bodySchema)(request, response, next);

    expect(next).toHaveBeenCalled();
  });

  test('error on validate request with query', async () => {
    const request = {
      query: {
        pageSize: '1',
      }
    } as unknown as Request;
    const response = { } as unknown as Response;
    response.send = jest.fn();
    response.status = jest.fn(() => response);
    const next: NextFunction = jest.fn();

    const bodySchema = object({
      query: object({
        pageSize: number().required(),
      }).noUnknown(true).strict()
    });

    validateRequest(bodySchema)(request, response, next);

    expect(response.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(response.send).toHaveBeenCalledWith(new ResponseData(null, GenericErrorCodes.WrongFields));
  });

  test('validate request with params', async () => {
    const request = {
      params: {
        _id: '1',
      }
    } as unknown as Request;
    const response = { } as unknown as Response;
    const next: NextFunction = jest.fn();

    const bodySchema = object({
      params: object({
        _id: string().required(),
      }).noUnknown(true).strict()
    });

    validateRequest(bodySchema)(request, response, next);

    expect(next).toHaveBeenCalled();
  });

  test('error on validate request with params', async () => {
    const request = {
      params: {
        _id: 1,
      }
    } as unknown as Request;
    const response = { } as unknown as Response;
    response.send = jest.fn();
    response.status = jest.fn(() => response);
    const next: NextFunction = jest.fn();

    const bodySchema = object({
      params: object({
        _id: string().required(),
      }).noUnknown(true).strict()
    });

    validateRequest(bodySchema)(request, response, next);

    expect(response.status).toHaveBeenCalledWith(BAD_REQUEST);
    expect(response.send).toHaveBeenCalledWith(new ResponseData(null, GenericErrorCodes.WrongFields));
  });
});