import * as Yup from "yup";

export const orderDetails = Yup.object({
  selectProfession: Yup.string().required("selectPro is required"),
  business: Yup.string().required("business is required"),
  businessContact: Yup.string().required("businessContact is required"),
  faxNumber: Yup.string().required("faxNumber must be  required"),
  email: Yup.string().required("email  is required"),
  orderDetail: Yup.string().required("orderDetail is required"),
  refillNumber: Yup.string().required("Refill number is required"),
});
