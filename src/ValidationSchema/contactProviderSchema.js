import * as Yup from "yup";

export const contactProviderSchema = Yup.object({
  message: Yup.string().trim().required("Please provide some message"),
});
