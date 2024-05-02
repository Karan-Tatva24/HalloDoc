import * as Yup from "yup";

export const sendLinkSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is Required!"),
  lastName: Yup.string().trim().required("Last name is require"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Last Name is Required!"),
  phone: Yup.string()
    .required("Required!")
    .matches(/^\d{10,12}$/, "Invalid phone number!"),
});
