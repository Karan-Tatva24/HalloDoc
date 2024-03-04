import React from "react";
import Modal from "./Modal";
import { Box } from "@mui/material";
import { Input } from "../TextField/Input";
import PhoneInput from "react-phone-input-2";
import { useFormik } from "formik";
import { sendLinkSchema } from "../../ValidationSchema";
import { Button } from "../Button";

const SendLinkModal = ({ open, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
    },
    onSubmit: (values, onSubmitProps) => {
      console.log(values);
      onSubmitProps.resetForm();
      handleClose();
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
            name="firstname"
            label="Firstname"
            fullWidth
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
          />
          <Input
            name="lastname"
            label="Lastname"
            fullWidth
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
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
            <Button name="Cancel" variant="outlined" onClick={handleClose} />
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default SendLinkModal;
