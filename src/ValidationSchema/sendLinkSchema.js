import * as Yup from "yup";

export const sendLinkSchema = Yup.object({
  firstname: Yup.string().required("First name is require"),
  lastname: Yup.string().required("Last name is require"),
  email: Yup.string().email("Invalid email!").required("Last name is require"),
  phone: Yup.string().required("Required!"),
});
