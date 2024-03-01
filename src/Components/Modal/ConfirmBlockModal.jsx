import React from "react";
import { Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import BasicModal from "./Modal";
import { Input } from "../TextField/Input";
import { Button } from "../Button";
import { blockModalSchema } from "../../ValidationSchema";

const ConfirmBlockModal = ({ open, handleClose, handleOpen }) => {
  const formik = useFormik({
    initialValues: {
      blockRequest: "",
    },
    validationSchema: blockModalSchema,
    onSubmit: (values) => {
      console.log("submmitted", values);
    },
  });
  return (
    <BasicModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      header="Confirm Block"
    >
      <form>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography>
            Patient Name :<span style={{ color: "aqua" }}>test test</span>
          </Typography>
          <Input
            name="blockRequest"
            label="Provide Addtional Notes"
            fullWidth
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.blockRequest}
            error={
              formik.touched.blockRequest && Boolean(formik.errors.blockRequest)
            }
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Conform" variant="contained" />
            <Button name="Cancel" variant="outlined" onClick={handleClose} />
          </Box>
        </Box>
      </form>
    </BasicModal>
  );
};

export default ConfirmBlockModal;
