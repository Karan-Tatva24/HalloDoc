import * as Yup from "yup";

export const loginSchema = Yup.object({
  username: Yup.string().required("Required!"),
  password: Yup.string().required("Required!"),
});

export const forgotPasswordSchema = Yup.object({
  username: Yup.string().required("Required!"),
});

export const viewReservationSchema = Yup.object({
  patientNotes: Yup.string().required("Patient note is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  region: Yup.string().required("Region is required"),
  address: Yup.string().required("Address must be required"),
  roomNo: Yup.string().required("Required!"),
});

export const viewNotesSchema = Yup.object({
  adminNotes: Yup.string().required("Admin Notes in required"),
});

export const assignModalSchema = Yup.object({
  searchRegion: Yup.string().required("Search Region must be required"),
  description: Yup.string().required("Description must be required"),
  physician: Yup.string().required("Physician must be required"),
});

export const cancleModalSchema = Yup.object({
  additionalnotes: Yup.string().required("Additionalnotes must be required"),
  canelReason: Yup.string().required("Cancel reason must be required"),
});

export const blockModalSchema = Yup.object({
  blockRequest: Yup.string().required("Please provide resions"),
});
