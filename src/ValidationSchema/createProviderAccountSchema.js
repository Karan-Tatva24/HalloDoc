import * as Yup from "yup";

export const createProviderAccountSchema = Yup.object().shape({
  userName: Yup.string().required("Required!"),
  password: Yup.string()
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/,
      "Invalid Password Formate",
    )
    .required("Required!"),
  role: Yup.string().required("Required!"),
  firstName: Yup.string().required("Required!"),
  lastName: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email").required("Required!"),
  administratorPhone: Yup.string().required("Required!"),
  medicalLicense: Yup.string().required("Required!"),
  npiNumber: Yup.string().required("Required!"),
  selectedRegions: Yup.array().min(1, "Please select at least one region"),
  address1: Yup.string().required("Required!"),
  city: Yup.string().required("Required!"),
  state: Yup.string().required("Required!"),
  zip: Yup.string().required("Required!"),
  mailingPhone: Yup.string().required("Required!"),
  businessName: Yup.string().required("Required!"),
  businessWebsite: Yup.string().url("Invalid URL").required("Required!"),
  adminNotes: Yup.string().required("Required!"),
  //   IndConAgg: Yup.boolean().oneOf([true], "Must agree to terms"),
  //   BacCheck: Yup.boolean().oneOf([true], "Must agree to terms"),
  //   HIPAA: Yup.boolean().oneOf([true], "Must agree to terms"),
  //   nonDisAgg: Yup.boolean().oneOf([true], "Must agree to terms"),
});
