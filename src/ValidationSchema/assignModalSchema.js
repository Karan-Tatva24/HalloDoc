import * as Yup from "yup";

export const assignModalSchema = Yup.object({
  searchRegion: Yup.string().required("Search Region is Required!"),
  description: Yup.string().required("Description is Required!"),
  physician: Yup.string().required("Physician is Required!"),
});
