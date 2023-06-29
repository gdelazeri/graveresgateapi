import { object, string } from "yup";
import Permission from "../enum/user/UserPermission";
import Status from "../enum/user/UserStatus";

export const postUserSchema = object({
  body: object({
    name: string().required("Name is required"),
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum."),
  }),
});

export const putUserSchema = object({
  params: object({
    _id: string().required(),
  }),
  body: object({
    registrationId: string().optional(),
    name: string().optional(),
    email: string()
      .email("Must be a valid email")
      .optional(),
    permission: string().oneOf(Object.values(Permission)).optional(),
    status: string().oneOf(Object.values(Status)).optional(),
  }),
});

export const putOwnUserSchema = object({
  body: object({
    name: string().optional(),
    email: string()
      .email("Must be a valid email")
      .optional(),
  }),
});

export const deleteUserSchema = object({
  params: object({
    _id: string().required(),
  }),
});

export const postLoginSchema = object({
  body: object({
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: string()
      .required("Password is required"),
  }),
});
