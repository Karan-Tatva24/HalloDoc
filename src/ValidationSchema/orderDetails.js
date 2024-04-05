import * as Yup from "yup";

export const orderDetails = Yup.object({
  selectProfession: Yup.string().required("SelectPro is Required!"),
  business: Yup.string().required("Business is Required!"),
  orderDetail: Yup.string().required("OrderDetail is Required!"),
  refillNumber: Yup.string().required("Refill number is Required!"),
});
