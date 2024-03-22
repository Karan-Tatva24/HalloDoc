import * as Yup from "yup";

export const orderDetails = Yup.object({
  selectProfession: Yup.string().required("selectPro is required"),
  business: Yup.string().required("business is required"),
  orderDetail: Yup.string().required("orderDetail is required"),
  refillNumber: Yup.string().required("Refill number is required"),
});
