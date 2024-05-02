import * as Yup from "yup";

export const cancelModalSchema = Yup.object({
  additionalNotes: Yup.string()
    .trim()
    .required("Additional notes is Required!"),
  cancelReason: Yup.string().required("Cancel reason is Required!"),
});
