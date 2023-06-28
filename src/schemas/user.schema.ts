import { object, string, ref } from "yup";
import Permission from "../enum/user/UserPermission";
import Status from "../enum/user/UserStatus";

export const createUserSchema = object({
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
