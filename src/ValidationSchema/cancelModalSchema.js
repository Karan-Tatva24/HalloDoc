import * as Yup from "yup";

export const cancelModalSchema = Yup.object({
  additionalNotes: Yup.string().required("Additional notes must be required"),
  cancelReason: Yup.string().required("Cancel reason must be required"),
});
