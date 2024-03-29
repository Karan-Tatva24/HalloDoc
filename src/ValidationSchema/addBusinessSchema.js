import * as Yup from "yup";

export const addBusinessSchema = Yup.object({
  businessName: Yup.string().required("Business Name is Require!"),
  profession: Yup.string().required("Select Profession!"),
  faxNumber: Yup.number().required("Fax Number is Require!"),
  phone: Yup.string().required("Phone number is Require!"),
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email must Require!"),
  businessContact: Yup.string().required("Business Contact is Require!"),
  street: Yup.string().required("Street is Require!"),
  city: Yup.string().required("City is Require!"),
  state: Yup.string().required("State is Require!"),
  zipCode: Yup.string().required("Zip/Postal Code is Require!"),
});
