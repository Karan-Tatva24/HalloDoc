import * as Yup from "yup";

export const assignModalSchema = Yup.object({
  searchRegion: Yup.string().required("Search Region must be required"),
  description: Yup.string().required("Description must be required"),
  physician: Yup.string().required("Physician must be required"),
});
