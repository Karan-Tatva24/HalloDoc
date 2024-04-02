import * as Yup from "yup";

export const createRequestSchema = Yup.object({
  firstName: Yup.string().required("First Name is Required!"),
  lastName: Yup.string().required("Last Name is Required!"),
  phoneNumber: Yup.string().required("Phone Number is Required!"),
  email: Yup.string().email("Email is Invalid!").required("Email is Required!"),
  dob: Yup.string().required("Date Of Birth is Required!"),
  street: Yup.string().required("Street is Required!"),
  city: Yup.string().required("City is Required!"),
  state: Yup.string().required("State is Required!"),
  zipCode: Yup.string(),
  room: Yup.string(),
  adminNotes: Yup.string(),
});
