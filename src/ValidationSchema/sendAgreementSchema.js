import * as Yup from "yup";

export const sendAgreementSchema = Yup.object({
  phone: Yup.string()
    .required("Required!")
    .matches(/^\d{10}$/, "Invalid phone number"),
  email: Yup.string()
    .email("Invalid email")
    .required("Phone number is required"),
});
