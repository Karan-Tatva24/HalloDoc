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

export const createRequestByPatientSchema = Yup.object({
  patientNote: Yup.string(),
  patientFirstName: Yup.string().required("First Name is required"),
  patientLastName: Yup.string().required("Last Name is required"),
  dob: Yup.string().required("Date of birth is required"),
  patientEmail: Yup.string()
    .email("Enter valid email")
    .required("Email is required"),
  patientPhoneNumber: Yup.string(),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string().required("Zip code is required"),
  roomNumber: Yup.string(),
});
