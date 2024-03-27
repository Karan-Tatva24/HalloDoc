import * as Yup from "yup";

export const accountInfoSchema = Yup.object({
  role: Yup.string().required("Must select role"),
});

export const administratorInfoSchema = Yup.object({
  firstname: Yup.string().required("First name required!"),
  lastname: Yup.string().required("Last name required!"),
  email: Yup.string().email("Invalid email!").required("Email required!"),
  confirmemail: Yup.string()
    .email("Invalid email!")
    .required("Confirm email required!")
    .oneOf([Yup.ref("email"), null], "Confirm email must match with email"),
  administratorPhone: Yup.string()
    .required("Required!")
    .matches(/^\d{10}$/, "Invalid phone number"),
});

export const addressInfoSchema = Yup.object({
  address1: Yup.string().required("Address required!"),
  address2: Yup.string().required("Address required!"),
  city: Yup.string().required("City required!"),
  state: Yup.string().required("State required!"),
  zip: Yup.string()
    .required("Zip required!")
    .matches(/^\d{6}$/, "Invalid zip code"),
  mailingPhone: Yup.string()
    .required("Required!")
    .matches(/^\d{10}$/, "Invalid phone number"),
});

export const physicianInformationSchema = Yup.object({
  firstname: Yup.string().required("First name required!"),
  lastname: Yup.string().required("Last name required!"),
  email: Yup.string().email("Invalid email!").required("Email required!"),
  phoneNumber: Yup.string()
    .required("Required!")
    .matches(/^\d{10}$/, "Invalid phone number"),
  medicalLicense: Yup.string().required("Require!"),
  npiNumber: Yup.string().required("Require!"),
  synEmail: Yup.string()
    .email("Invalid email!")
    .required("Synchronization email required!"),
});

export const providerProfileSchema = Yup.object({
  businessName: Yup.string().required("Required!"),
  businessWebsite: Yup.string().required("Required!"),
  adminNotes: Yup.string().required("Required!"),
});
