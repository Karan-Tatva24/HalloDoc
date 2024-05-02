import * as Yup from "yup";

export const transferModalSchema = Yup.object({
  isAdmin: Yup.boolean(),
  searchRegion: Yup.string().when("isAdmin", {
    is: true,
    then: (schema) => schema.required("Region is Required!"),
  }),
  physician: Yup.string().when("isAdmin", {
    is: true,
    then: (schema) => schema.required("Physician is Required!"),
  }),
  description: Yup.string().trim().required("Description is Required!"),
});
