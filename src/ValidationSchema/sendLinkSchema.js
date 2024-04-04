import * as Yup from "yup";

export const sendLinkSchema = Yup.object({
  firstName: Yup.string().required("First name is require"),
  lastName: Yup.string().required("Last name is require"),
  email: Yup.string().email("Invalid email!").required("Last name is require"),
  phone: Yup.string().required("Required!"),
});
