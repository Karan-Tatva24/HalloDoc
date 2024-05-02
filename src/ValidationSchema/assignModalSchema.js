import * as Yup from "yup";

export const assignModalSchema = Yup.object({
  searchRegion: Yup.string().required("Search Region is Required!"),
  description: Yup.string().trim().required("Description is Required!"),
  physician: Yup.string().trim().required("Physician is Required!"),
});
