import React from "react";
import { Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import BasicModal from "./Modal";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { requestSupportSchema } from "../../ValidationSchema";

const RequestSupportModal = ({ open, handleClose, handleOpen }) => {
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: requestSupportSchema,
    onSubmit: (values) => {
      console.log("submmitted", values);
    },
  });
  return (
    <BasicModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      header="Request Support"
    >
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
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Send" type="submit" variant="contained" />
            <Button name="Cancel" variant="outlined" onClick={handleClose} />
          </Box>
        </Box>
      </form>
    </BasicModal>
  );
};

export default RequestSupportModal;
