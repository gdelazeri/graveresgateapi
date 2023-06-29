import { object, string, ref } from "yup";
import Permission from "../enum/user/UserPermission";
import Status from "../enum/user/UserStatus";

export const postUserSchema = object({
  body: object({
    registrationId: string().required("RegistrationId is required"),
    name: string().required("Name is required"),
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum."),
    permission: string().oneOf(Object.values(Permission)).required(),
    status: string().oneOf(Object.values(Status)).required(),
    imageUrl: string().optional(),
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
    imageUrl: string().optional(),
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
