import * as Yup from "yup";

export const createRequestSchema = Yup.object({
  firstName: Yup.string().trim().required("First Name is Required!"),
  lastName: Yup.string().trim().required("Last Name is Required!"),
  phoneNumber: Yup.string().required("Phone Number is Required!"),
  email: Yup.string().email("Email is Invalid!").required("Email is Required!"),
  dob: Yup.string().required("Date Of Birth is Required!"),
  street: Yup.string().trim().required("Street is Required!"),
  city: Yup.string().trim().required("City is Required!"),
  state: Yup.string().trim().required("State is Required!"),
  zipCode: Yup.string(),
  room: Yup.string(),
  adminNotes: Yup.string(),
});

export const createRequestByPatientSchema = Yup.object({
  isEmail: Yup.boolean(),
  password: Yup.string().when("isEmail", {
    is: false,
    then: (schema) =>
      schema
        .matches(
          /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/,
          "Invalid Password Formate",
        )
        .required("Required!"),
  }),
  confirmPassword: Yup.string().when("isEmail", {
    is: false,
    then: (schema) =>
      schema
        .required("Required!")
        .oneOf([Yup.ref("password"), null], "Confirm password must match"),
  }),
  patientNote: Yup.string(),
  patientFirstName: Yup.string().trim().required("First Name is required"),
  patientLastName: Yup.string().trim().required("Last Name is required"),
  dob: Yup.string().required("Date of birth is required"),
  patientEmail: Yup.string()
    .email("Enter valid email")
    .required("Email is required"),
  patientPhoneNumber: Yup.string(),
  street: Yup.string().trim().required("Street is required"),
  city: Yup.string().trim().required("City is required"),
  state: Yup.string().trim().required("State is required"),
  zipCode: Yup.string().trim().required("Zip code is required"),
  roomNumber: Yup.string(),
});

export const createRequestAllSchema = Yup.object({
  requestType: Yup.string(),
  requestorFirstName: Yup.string()
    .trim()
    .required("Your First Name is Required"),
  requestorLastName: Yup.string().trim().required("Your Last Name is Required"),
  requestorPhoneNumber: Yup.string().required("Your Phone Number is Required"),
  requestorEmail: Yup.string()
    .email("Invalid Email")
    .required("Your Email is Required"),
  relationName: Yup.string()
    .trim()
    .when("requestType", {
      is: "Family/Friend",
      then: (schema) => schema.required("Relation Name is Required"),
      otherwise: (schema) => schema.required("Property is Required"),
    }),
  street: Yup.string().trim().required("Street is Required"),
  city: Yup.string().trim().required("City is Required"),
  state: Yup.string().trim().required("State is Required"),
  zipCode: Yup.string().trim().required("Zip Code is Required"),
  patientNote: Yup.string().trim().required("Patient Note is Required"),
  patientFirstName: Yup.string()
    .trim()
    .required("Patient First Name is Required"),
  patientLastName: Yup.string()
    .trim()
    .required("Patient Last Name is Required"),
  dob: Yup.string().required("Date of Birth is Required"),
  patientEmail: Yup.string()
    .email("Invalid Email")
    .required("Email is Required"),
  isEmail: Yup.boolean(),
  patientPhoneNumber: Yup.string().required("is Required"),
  roomNumber: Yup.string(),
});

export const submitInformationSchema = Yup.object({
  relationName: Yup.string(),
  patientFirstName: Yup.string()
    .trim()
    .required("Patient First Name is Required"),
  patientLastName: Yup.string().trim().required("Patient Last is Required"),
  patientEmail: Yup.string()
    .email("Invalid Email")
    .required("Patient Email is Required"),
  patientPhoneNumber: Yup.string().required("Patient Phone number is Required"),
  isEmail: Yup.boolean(),
  dob: Yup.string().required("Date of birth is Required"),
  street: Yup.string().trim().required("Street is Required"),
  city: Yup.string().trim().required("City is Required"),
  state: Yup.string().trim().required("State is Required"),
  zipCode: Yup.string().trim().required("ZipCode is Required"),
  roomNumber: Yup.string(),
  patientNote: Yup.string(),
});
