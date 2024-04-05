import * as Yup from "yup";

export const contectProviderSchema = Yup.object({
  message: Yup.string().required("Please provide some message"),
});
