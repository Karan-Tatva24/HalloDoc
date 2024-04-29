import * as Yup from "yup";

export const signUpPageSchema = Yup.object({
  email: Yup.string()
    .email("Username must be valid email")
    .required("Required!"),
  password: Yup.string()
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/,
      "Invalid Password Formate",
    )
    .required("Required!"),
  confirmPassword: Yup.string()
    .required("Required!")
    .oneOf([Yup.ref("password"), null], "Confirm password must match"),
});
