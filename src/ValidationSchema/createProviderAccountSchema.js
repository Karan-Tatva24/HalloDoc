import * as Yup from "yup";

export const createProviderAccountSchema = Yup.object().shape({
  userName: Yup.string().trim().required("Required!"),
  password: Yup.string()
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/,
      "Invalid Password Formate",
    )
    .required("Required!"),
  role: Yup.string().required("Required!"),
  firstName: Yup.string().trim().required("Required!"),
  lastName: Yup.string().trim().required("Required!"),
  email: Yup.string().email("Invalid email").required("Required!"),
  administratorPhone: Yup.string().required("Required!"),
  medicalLicense: Yup.string().trim().required("Required!"),
  npiNumber: Yup.string().trim().required("Required!"),
  selectedRegions: Yup.array().min(1, "Please select at least one region"),
  address1: Yup.string().trim().required("Required!"),
  city: Yup.string().trim().required("Required!"),
  state: Yup.string().trim().required("Required!"),
  zip: Yup.string().trim().required("Required!"),
  mailingPhone: Yup.string().required("Required!"),
  businessName: Yup.string().trim().required("Required!"),
  businessWebsite: Yup.string().trim().url("Invalid URL").required("Required!"),
  adminNotes: Yup.string().trim().required("Required!"),
  //   IndConAgg: Yup.boolean().oneOf([true], "Must agree to terms"),
  //   BacCheck: Yup.boolean().oneOf([true], "Must agree to terms"),
  //   HIPAA: Yup.boolean().oneOf([true], "Must agree to terms"),
  //   nonDisAgg: Yup.boolean().oneOf([true], "Must agree to terms"),
});
