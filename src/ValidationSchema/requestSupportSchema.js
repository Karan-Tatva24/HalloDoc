import * as Yup from "yup";

export const requestSupportSchema = Yup.object({
  message: Yup.string().required("Please provide message"),
});
