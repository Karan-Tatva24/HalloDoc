import * as Yup from "yup";

export const viewNotesSchema = Yup.object({
  isAdmin: Yup.boolean(),
  adminNotes: Yup.string()
    .trim()
    .when("isAdmin", {
      is: true,
      then: (schema) => schema.required("Admin Notes is Required!"),
      otherwise: (schema) => schema.required("Provider Notes is Required!"),
    }),
});
