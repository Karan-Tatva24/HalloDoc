import React from "react";
import Modal from "./Modal";
import { Box } from "@mui/material";
import { Input } from "../TextField/Input";
import PhoneInput from "react-phone-input-2";
import { useFormik } from "formik";
import { sendLinkSchema } from "../../ValidationSchema";
import { Button } from "../Button";
import { useDispatch } from "react-redux";
import { sendLink } from "../../redux/halloAPIs/sendLinkAPI";
import { toast } from "react-toastify";

const SendLinkModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
    onSubmit: (values, onSubmitProps) => {
      dispatch(
        sendLink({
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phone,
          email: values.email,
        }),
      ).then((response) => {
        if (response.type === "sendLink/fulfilled") {
          toast.success(response.payload.message);
          handleClose();
          onSubmitProps.resetForm();
        } else if (response.type === "sendLink/rejected") {
          toast.error(response.payload.data.validation.body.message);
        }
      });
    },
    validationSchema: sendLinkSchema,
  });

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      header="Send mail to patient for submitting request"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Input
            name="firstName"
            label="First Name"
            fullWidth
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <Input
            name="lastName"
            label="Last Name"
            fullWidth
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <PhoneInput
            name="phone"
            country={"in"}
            inputStyle={{ width: "100%", height: "3.438rem" }}
            value={formik.values.phone}
            onChange={(value) => formik.setFieldValue("phone", value)}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <Input
            name="email"
            label="Email"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Send" variant="contained" type="submit" />
            <Button
              name="Cancel"
              variant="outlined"
              onClick={() => {
                formik.resetForm();
                handleClose();
              }}
            />
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default SendLinkModal;
