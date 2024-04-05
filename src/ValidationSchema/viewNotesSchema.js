import * as Yup from "yup";

export const viewNotesSchema = Yup.object({
  adminNotes: Yup.string().required("Admin Notes is Required!"),
});
