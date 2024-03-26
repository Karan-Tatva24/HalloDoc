import React from "react";
import { Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { requestSupportSchema } from "../../ValidationSchema";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { requestSupport } from "../../redux/halloAPIs/requestSupportAPI";

const RequestSupportModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: requestSupportSchema,
    onSubmit: (values, onSubmitProps) => {
      dispatch(requestSupport(values.message));
      onSubmitProps.resetForm();
      handleClose();
    },
  });
  return (
    <Modal open={open} handleClose={handleClose} header="Request Support">
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography>
            To all unscheduled Physicians: We are short on coverage and needs
            additional support On Call to respond to Requests.
          </Typography>
          <Input
            name="message"
            label="Message"
            fullWidth
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
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

export default RequestSupportModal;
