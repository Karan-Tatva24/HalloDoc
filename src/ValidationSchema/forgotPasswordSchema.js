import * as Yup from "yup";

export const forgotPasswordSchema = Yup.object({
  username: Yup.string()
    .email("User name must be valid email")
    .required("Required!"),
});
