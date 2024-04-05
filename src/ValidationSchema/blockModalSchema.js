import * as Yup from "yup";

export const blockModalSchema = Yup.object({
  blockRequest: Yup.string().required(
    "Please provide reason for block patient",
  ),
});
