import * as Yup from "yup";

export const viewReservationSchema = Yup.object({
  patientNotes: Yup.string(),
  firstName: Yup.string().required("First name is Required!"),
  lastName: Yup.string().required("Last name Required!"),
  dateOfBirth: Yup.date().required("Date of birth is Required!"),
  phone: Yup.string()
    .required("Required!")
    .matches(/^\d{10,12}$/, "Invalid phone number"),
  email: Yup.string().email("Invalid email").required("Email is Required!"),
  region: Yup.string().required("Region is Required!"),
  address: Yup.string().required("Address is Required!"),
});
