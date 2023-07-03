import { number, object, string } from "yup";
import Permission from "../enum/user/UserPermission";
import Status from "../enum/user/UserStatus";

export const getOwnUserSchema = object({ }).noUnknown(true).strict();

export const listUsersSchema = object({
  query: object({
    pageNumber: string().required(),
    pageSize: string().required(),
  }).noUnknown(true).strict()
});

export const postUserSchema = object({
  body: object({
    name: string().required("Name is required"),
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum."),
  }).noUnknown(true).strict()
});

export const putUserSchema = object({
  params: object({
    _id: string().required(),
  }).noUnknown(true).strict(),
  body: object({
    registrationId: string().optional(),
    name: string().optional(),
    email: string()
      .email("Must be a valid email")
      .optional(),
    permission: string().oneOf(Object.values(Permission)).optional(),
    status: string().oneOf(Object.values(Status)).optional(),
  }).noUnknown(true).strict()
});

export const putOwnUserSchema = object({
  body: object({
    name: string().optional(),
    email: string()
      .email("Must be a valid email")
      .optional(),
  }).noUnknown(true).strict(),
});

export const deleteUserSchema = object({
  params: object({
    _id: string().required(),
  }).noUnknown(true).strict(),
});

export const postLoginSchema = object({
  body: object({
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: string()
      .required("Password is required"),
  }).noUnknown(true).strict(),
});
