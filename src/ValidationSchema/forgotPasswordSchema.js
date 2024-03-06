import * as Yup from "yup";

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("User name must be valid email")
    .required("Required!"),
});
