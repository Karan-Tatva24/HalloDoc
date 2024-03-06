import * as Yup from "yup";

export const accountInfoSchema = Yup.object({
  username: Yup.string().required("Username required!"),
  password: Yup.string()
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/,
      "Invalid Password Formate",
    )
    .required("Required!"),
  status: Yup.string().required("Must select status"),
  role: Yup.string().required("Must select role"),
});

export const administratorInfoSchema = Yup.object({
  firstname: Yup.string().required("Firstname required!"),
  lastname: Yup.string().required("Lastname required!"),
  email: Yup.string().email("Invalid email!").required("Email required!"),
  confirmemail: Yup.string()
    .email("Invalid email!")
    .required("Confirm email required!"),
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
    .matches(/^\d{6}$/, "Invalid zipcode"),
  mailingPhone: Yup.string()
    .required("Required!")
    .matches(/^\d{10}$/, "Invalid phone number"),
});

export const physicianInformationSchema = Yup.object({
  firstname: Yup.string().required("Firstname required!"),
  lastname: Yup.string().required("Lastname required!"),
  email: Yup.string().email("Invalid email!").required("Email required!"),
  phoneNumber: Yup.string()
    .required("Required!")
    .matches(/^\d{10}$/, "Invalid phone number"),
  medicalLicence: Yup.string().required("Require!"),
  npiNumber: Yup.string().required("Require!"),
  synEmail: Yup.string()
    .email("Invalid email!")
    .required("Syncronization email required!"),
});

export const providerProfileSchema = Yup.object({
  businessname: Yup.string().required("Required!"),
  businesswebsite: Yup.string().required("Required!"),
  adminnotes: Yup.string().required("Required!"),
});
