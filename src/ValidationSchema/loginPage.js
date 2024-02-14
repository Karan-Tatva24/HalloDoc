import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Required!"),
  password: Yup.string().required("Required!"),
});

export default validationSchema;
