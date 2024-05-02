import * as Yup from "yup";

export const requestSupportSchema = Yup.object({
  message: Yup.string().trim().required("Please provide message"),
});
