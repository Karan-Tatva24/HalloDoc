import * as Yup from "yup";

export const concludeCareSchema = Yup.object({
  providerNotes: Yup.string().trim().required("Please provide some notes"),
});
