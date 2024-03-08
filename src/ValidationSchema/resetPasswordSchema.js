import * as Yup from "yup";

export const resetPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/,
      "Invalid Password Formate",
    )
    .required("Required!"),
  confirmPassword: Yup.string()
    .required("Required!")
    .oneOf([Yup.ref("newPassword"), null], "Confirm pasword must match"),
});
