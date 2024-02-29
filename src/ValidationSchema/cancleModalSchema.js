import * as Yup from "yup";

export const cancleModalSchema = Yup.object({
  additionalnotes: Yup.string().required("Additionalnotes must be required"),
  canelReason: Yup.string().required("Cancel reason must be required"),
});
