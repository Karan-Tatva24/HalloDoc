import * as Yup from "yup";

export const transferModalSchema = Yup.object({
  isAdmin: Yup.boolean(),
  searchRegion: Yup.string().when("isAdmin", {
    is: true,
    then: Yup.string().required("Search Region is Required!"),
  }),
  physician: Yup.string().when("isAdmin", {
    is: true,
    then: Yup.string().required("Physician is Required!"),
  }),
  description: Yup.string().required("Description is Required!"),
});
