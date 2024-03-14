import * as Yup from "yup";

export const viewReservationSchema = Yup.object({
  patientNotes: Yup.string(),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  phone: Yup.string()
    .required("Required!")
    .matches(/^\d{10}$/, "Invalid phone number"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  region: Yup.string().required("Region is required"),
  address: Yup.string().required("Address must be required"),
  roomNo: Yup.string().required("Required!"),
});
