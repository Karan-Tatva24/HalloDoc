import React from "react";
import Modal from "./Modal";
import { useFormik } from "formik";
import { Box, Typography } from "@mui/material";
import { Input } from "../TextField/Input";
import { sendAgreementSchema } from "../../ValidationSchema";
import { Button } from "../Button";
import "./modal.css";

const SendAgreementModal = ({ open, handleClose, handleOpen }) => {
  const formik = useFormik({
    initialValues: {
      phone: "",
      email: "",
    },
    onSubmit: (values, onSubmitProps) => {
      console.log("Form Submitted", values);
      onSubmitProps.resetForm();
      handleClose();
    },
    validationSchema: sendAgreementSchema,
  });
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      handleOpen={handleOpen}
      header="Send Agreement"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography className="text-dot">Patient</Typography>
          <Typography variant="caption">
            To Send Agreement please make sure you are updating the correct
            contact information below for the responsible party.
          </Typography>
          <Input
            name="phone"
            fullWidth
            label="Phone Number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
          />
          <Input
            name="email"
            fullWidth
            label="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Send" type="submit" variant="contained" />
            <Button name="Cancel" variant="outlined" onClick={handleClose} />
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default SendAgreementModal;
