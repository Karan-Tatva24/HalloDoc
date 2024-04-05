import * as Yup from "yup";

export const addBusinessSchema = Yup.object({
  businessName: Yup.string().required("Business Name is Required!"),
  profession: Yup.string().required("Select Profession!"),
  faxNumber: Yup.number().required("Fax Number is Required!"),
  phone: Yup.string()
    .required("Required!")
    .matches(/^\d{10,12}$/, "Invalid phone number!"),
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email must Required!"),
  businessContact: Yup.string().required("Business Contact is Required!"),
  street: Yup.string().required("Street is Required!"),
  city: Yup.string().required("City is Required!"),
  state: Yup.string().required("State is Required!"),
  zipCode: Yup.string().required("Zip/Postal Code is Required!"),
});
