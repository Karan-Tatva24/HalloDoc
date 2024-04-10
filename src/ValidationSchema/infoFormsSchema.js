import * as Yup from "yup";

export const accountInfoSchema = Yup.object({
  role: Yup.string().required("Must select role"),
  password: Yup.string()
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/,
      "Invalid Password Formate",
    )
    .required("Required!"),
});

export const administratorInfoSchema = Yup.object({
  firstName: Yup.string().required("First name Required!"),
  lastName: Yup.string().required("Last name Required!"),
  email: Yup.string().email("Invalid email!").required("Email Required!"),
  confirmEmail: Yup.string()
    .email("Invalid email!")
    .required("Confirm email Required!")
    .oneOf([Yup.ref("email"), null], "Confirm email must match with email"),
  administratorPhone: Yup.string()
    .required("Required!")
    .matches(/^\d{10,12}$/, "Invalid phone number"),
});

export const addressInfoSchema = Yup.object({
  address1: Yup.string().required("Address Required!"),
  address2: Yup.string().required("Address Required!"),
  city: Yup.string().required("City Required!"),
  state: Yup.string().required("State Required!"),
  zipCode: Yup.string()
    .required("Zip Required!")
    .matches(/^\d{5,6}$/, "Invalid zip code"),
  altPhone: Yup.string()
    .required("Required!")
    .matches(/^\d{10,12}$/, "Invalid phone number"),
});

export const physicianInformationSchema = Yup.object({
  firstName: Yup.string().required("First name Required!"),
  lastName: Yup.string().required("Last name Required!"),
  email: Yup.string().email("Invalid email!").required("Email Required!"),
  phoneNumber: Yup.string()
    .required("Required!")
    .matches(/^\d{10,12}$/, "Invalid phone number"),
  medicalLicense: Yup.string().required("Require!"),
  NPINumber: Yup.string().required("Require!"),
  syncEmailAddress: Yup.string().email("Invalid email!"),
});

export const providerProfileSchema = Yup.object({
  businessName: Yup.string().required("Required!"),
  businessWebsite: Yup.string().required("Required!"),
  adminNotes: Yup.string().required("Required!"),
});
